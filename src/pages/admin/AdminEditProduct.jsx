import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../api/axios";

function AdminEditProduct() {
  const { id }   = useParams();
  const navigate = useNavigate();

  const [categories,     setCategories]     = useState([]);
  const [loading,        setLoading]        = useState(false);
  const [existingImage,  setExistingImage]  = useState(null);
  const [preview,        setPreview]        = useState(null);
  const [error,          setError]          = useState("");

  const [form, setForm] = useState({
    name:        "",
    description: "",
    price:       "",
    stock:       "",
    category:    "",
    image:       null,
  });

  useEffect(() => {
    Promise.all([
      API.get(`/api/admin-products/${id}/`),
      API.get("/api/categories/"),
    ]).then(([productRes, catsRes]) => {
      const p = productRes.data;
      setForm({
        name:        p.name,
        description: p.description,
        price:       p.price,
        stock:       p.stock,
        category:    p.category,
        image:       null,
      });
      setExistingImage(p.image_url);
      setCategories(catsRes.data);
    }).catch(err => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("name",        form.name);
      formData.append("description", form.description);
      formData.append("price",       form.price);
      formData.append("stock",       form.stock);
      formData.append("category",    form.category);
      if (form.image) {
        formData.append("image", form.image);
      }

      await API.put(`/api/admin-products/${id}/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/admin/products");
    } catch (err) {
      console.error(err.response?.data);
      setError("Update failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>

      {error && <div className="alert alert-error mb-4 text-sm">⚠️ {error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Product Name *"
          className="input input-bordered w-full"
          required
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          rows={3}
          className="textarea textarea-bordered w-full"
        />

        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price (৳) *"
          className="input input-bordered w-full"
          required
        />

        <input
          type="number"
          name="stock"
          value={form.stock}
          onChange={handleChange}
          placeholder="Stock *"
          className="input input-bordered w-full"
          required
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="select select-bordered w-full"
          required
        >
          <option value="">Select Category</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>

        {/* Image */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-600">Product Image</label>

          {!preview && existingImage && (
            <div>
              <p className="text-xs text-gray-400 mb-1">Current image:</p>
              <img
                src={existingImage}
                alt="current"
                className="w-40 h-40 object-cover rounded-lg border"
              />
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered w-full"
            onChange={handleImageChange}
          />

          {preview && (
            <div>
              <p className="text-xs text-gray-400 mb-1">New image:</p>
              <img
                src={preview}
                alt="preview"
                className="w-40 h-40 object-cover rounded-lg border"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full"
        >
          {loading
            ? <><span className="loading loading-spinner loading-sm" /> Updating...</>
            : "Update Product"
          }
        </button>

        <button
          type="button"
          onClick={() => navigate("/admin/products")}
          className="btn btn-ghost w-full"
        >
          ← Cancel
        </button>

      </form>
    </div>
  );
}

export default AdminEditProduct;