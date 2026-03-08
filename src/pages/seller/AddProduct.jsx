import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import SellerSidebar from "./SellerSidebar";

function AddProduct() {

  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: ""
  });

  useEffect(() => {
    API.get("/api/categories/")
      .then(res => setCategories(res.data));
  }, []);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await API.post("/api/products/", product);

      navigate("/seller/products");

    } catch (error) {

      console.error(error.response?.data);

      alert("Failed to create product");

    }
  };

  return (

    <div className="flex">

      <SellerSidebar />

      <div className="p-6 flex-1">

        <h1 className="text-2xl font-bold mb-6">
          Add Product
        </h1>

        <form
          onSubmit={handleSubmit}
          className="max-w-md space-y-4"
        >

          {/* Product Name */}

          <input
            name="name"
            placeholder="Product Name"
            className="input input-bordered w-full"
            onChange={handleChange}
            required
          />

          {/* Category */}

          <select
            name="category"
            className="select select-bordered w-full"
            onChange={handleChange}
            required
          >

            <option value="">Select Category</option>

            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}

          </select>

          {/* Price */}

          <input
            type="number"
            name="price"
            placeholder="Price"
            className="input input-bordered w-full"
            onChange={handleChange}
            required
          />

          {/* Stock */}

          <input
            type="number"
            name="stock"
            placeholder="Stock Quantity"
            className="input input-bordered w-full"
            onChange={handleChange}
            required
          />

          {/* Description */}

          <textarea
            name="description"
            placeholder="Description"
            className="textarea textarea-bordered w-full"
            onChange={handleChange}
          />

          <button className="btn btn-primary w-full">
            Add Product
          </button>

        </form>

      </div>

    </div>

  );
}

export default AddProduct;