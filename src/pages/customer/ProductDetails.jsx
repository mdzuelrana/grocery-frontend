import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function ProductDetails() {

  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {

    api.get(`/api/products/${id}/`)
      .then(res => setProduct(res.data))
      .catch(err => console.log(err));

  }, [id]);

  const addToCart = async () => {

    try {

      await api.post("/api/cart/", {
        product: product.id,
        quantity: 1,
      });

      alert("Added to cart");

    } catch (err) {

      alert("Please login first",err);

    }

  };

  if (!product) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (

    <div className="max-w-6xl mx-auto px-4 py-10">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">

        {/* Product Image */}
        <div className="bg-base-100 rounded-lg shadow p-4">

          <img
            src={product.image}
            alt={product.name}
            className="w-full h-72 sm:h-96 object-cover rounded"
          />

        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-center">

          <h1 className="text-2xl sm:text-3xl font-bold">
            {product.name}
          </h1>

          <p className="text-2xl font-semibold text-green-600 mt-3">
            ৳ {product.price}
          </p>

          <p className="mt-4 text-gray-600 leading-relaxed">
            {product.description}
          </p>

          <button
            onClick={addToCart}
            className="btn btn-primary mt-6 w-full sm:w-52"
          >
            Add To Cart
          </button>

        </div>

      </div>

    </div>

  );
}