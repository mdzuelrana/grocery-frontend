import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../api/axios";
import SellerSidebar from "./SellerSidebar";

function SellerEditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState("");
  const [preview, setPreview]       = useState(null);   // ✅ new image preview
  const [existingImage, setExistingImage] = useState(null); // ✅ current image

  const [product, setProduct] = useState({
    name:        "",
    description: "",
    price:       "",
    stock:       "",
    category:    "",
    image:       null,
  });

  useEffect(() => {
    API.get(`/api/products/${id}/`)
      .then(res => {
        setProduct({
          name:        res.data.name,
          description: res.data.description,
          price:       res.data.price,
          stock:       res.data.stock,
          category:    res.data.category,
          image:       null,  // ✅ don't prefill file input
        });
        setExistingImage(res.data.image_url);  // ✅ show current image
      })
      .catch(err => console.error(err));

    API.get("/api/categories/")
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
    setError("");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProduct({ ...product, image: file });
      setPreview(URL.createObjectURL(file));  // ✅ preview new image
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // ✅ use FormData for file upload
      const formData = new FormData();
      formData.append('name',        product.name);
      formData.append('description', product.description);
      formData.append('price',       product.price);
      formData.append('stock',       product.stock);
      formData.append('category',    product.category);
      if (product.image) {
        formData.append('image', product.image);  // ✅ only append if new image selected
      }

      await API.put(`/api/products/${id}/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      navigate("/seller/products");

    } catch (error) {
      console.error(error.response?.data);
      setError("Update failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <SellerSidebar />

      <div className="p-6 flex-1 max-w-2xl">
        <h1 className="text-2xl font-bold mb-6">Edit Product</h1>

        {error && (
          <div className="alert alert-error mb-4 text-sm">⚠️ {error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Product Name *"
            className="input input-bordered w-full"
            required
          />

          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Description"
            rows={4}
            className="textarea textarea-bordered w-full"
          />

          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="Price (৳) *"
            className="input input-bordered w-full"
            required
          />

          <input
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            placeholder="Stock *"
            className="input input-bordered w-full"
            required
          />

          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            className="select select-bordered w-full"
            required
          >
            <option value="">Select Category</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>

          {/* ✅ Image section */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">
              Product Image
            </label>

            {/* show existing image if no new one selected */}
            {!preview && existingImage && (
              <div>
                <p className="text-xs text-gray-400 mb-1">Current image:</p>
                <img
                  src={existingImage}
                  alt="Current"
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

            {/* show new image preview */}
            {preview && (
              <div>
                <p className="text-xs text-gray-400 mb-1">New image:</p>
                <img
                  src={preview}
                  alt="New preview"
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
            {loading ? (
              <><span className="loading loading-spinner loading-sm" /> Updating...</>
            ) : (
              "Update Product"
            )}
          </button>

        </form>
      </div>
    </div>
  );
}

export default SellerEditProduct;