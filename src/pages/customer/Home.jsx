import { useEffect, useState } from "react";
import api from "../../api/axios";
import ProductCard from "../../components/ProductCard";
import Loader from "../../components/Loader";

export default function Home() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    api.get("/api/products/")
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      });

  }, []);

  if (loading) return <Loader />;

  return (

    <div>

      <div className="hero bg-base-200 rounded-lg mb-10">
        <div className="hero-content text-center">
          <div>
            <h1 className="text-4xl font-bold">
              Welcome to Grocery Store
            </h1>
            <p className="py-4">
              Fresh groceries delivered to your home
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6">
        Featured Products
      </h2>

      <div className="grid grid-cols-4 gap-6">

        {products.slice(0,8).map(product => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}

      </div>

    </div>
  );
}