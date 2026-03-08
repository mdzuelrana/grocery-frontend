import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";

function EditProduct() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: ""
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchProduct = async () => {
      try {
        const res = await API.get(`/api/products/${id}/`);
        setProduct(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();

  }, [id]);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await API.put(`/api/products/${id}/`, product);

      alert("Product updated successfully");

      navigate("/admin");

    } catch (err) {
      console.log(err);
      alert("Update failed");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (

    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-lg bg-base-100 shadow-xl rounded-xl p-6 sm:p-8">

        <h1 className="text-xl sm:text-2xl font-bold mb-6 text-center">
          Edit Product
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="input input-bordered w-full"
            required
          />

          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="Price"
            className="input input-bordered w-full"
            required
          />

          <textarea
            name="description"
            value={product.description || ""}
            onChange={handleChange}
            placeholder="Description"
            className="textarea textarea-bordered w-full"
            rows="4"
          />

          <button className="btn btn-primary w-full">
            Update Product
          </button>

        </form>

      </div>

    </div>

  );
}

export default EditProduct;