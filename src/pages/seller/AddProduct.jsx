import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import SellerSidebar from "./SellerSidebar";

function AddProduct() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState("");
  const [preview, setPreview]       = useState(null);  // ✅ image preview

  const [product, setProduct] = useState({
    name:        "",
    description: "",
    price:       "",
    stock:       "",
    category:    "",
    image:       null,  // ✅ image file
  });

  useEffect(() => {
    API.get("/api/categories/")
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
    setError("");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProduct({ ...product, image: file });
      setPreview(URL.createObjectURL(file));  // ✅ show preview
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // ✅ use FormData — required for file upload
      const formData = new FormData();
      formData.append('name',        product.name);
      formData.append('description', product.description);
      formData.append('price',       product.price);
      formData.append('stock',       product.stock);
      formData.append('category',    product.category);
      if (product.image) {
        formData.append('image', product.image);
      }

      await API.post("/api/products/", formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      navigate("/seller/products");

    } catch (error) {
      console.error(error.response?.data);
      setError("Failed to create product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <SellerSidebar />

      <div className="p-6 flex-1 max-w-2xl">
        <h1 className="text-2xl font-bold mb-6">Add Product</h1>

        {error && (
          <div className="alert alert-error mb-4 text-sm">⚠️ {error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="name"
            placeholder="Product Name *"
            className="input input-bordered w-full"
            onChange={handleChange}
            required
          />

          <select
            name="category"
            className="select select-bordered w-full"
            onChange={handleChange}
            required
          >
            <option value="">Select Category *</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>

          <input
            type="number"
            name="price"
            placeholder="Price (৳) *"
            className="input input-bordered w-full"
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="stock"
            placeholder="Stock Quantity *"
            className="input input-bordered w-full"
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Product Description"
            rows={4}
            className="textarea textarea-bordered w-full"
            onChange={handleChange}
          />

          {/* ✅ Image upload */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">
              Product Image
            </label>
            <input
              type="file"
              accept="image/*"
              className="file-input file-input-bordered w-full"
              onChange={handleImageChange}
            />
            {/* ✅ Image preview */}
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-40 h-40 object-cover rounded-lg border mt-2"
              />
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full"
          >
            {loading ? (
              <><span className="loading loading-spinner loading-sm" /> Adding...</>
            ) : (
              "Add Product"
            )}
          </button>

        </form>
      </div>
    </div>
  );
}

export default AddProduct;