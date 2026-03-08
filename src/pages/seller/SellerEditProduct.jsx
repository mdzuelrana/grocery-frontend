import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../api/axios";
import SellerSidebar from "./SellerSidebar";

function SellerEditProduct() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: ""
  });

  // Load product
  useEffect(() => {

    API.get(`/api/products/${id}/`)
      .then(res => setProduct(res.data))
      .catch(err => console.log(err));

    API.get("/api/categories/")
      .then(res => setCategories(res.data));

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

      alert("Product updated");

      navigate("/seller/products");

    } catch (error) {

      console.log(error.response?.data);

      alert("Update failed");

    }

  };

  return (

    <div className="flex">

      <SellerSidebar />

      <div className="p-6 flex-1">

        <h1 className="text-2xl font-bold mb-6">
          Edit Product
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 max-w-md"
        >

          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="input input-bordered w-full"
            required
          />

          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Description"
            className="textarea textarea-bordered w-full"
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

          <input
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            placeholder="Stock"
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
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}

          </select>

          <button className="btn btn-primary w-full">
            Update Product
          </button>

        </form>

      </div>

    </div>

  );

}

export default SellerEditProduct;