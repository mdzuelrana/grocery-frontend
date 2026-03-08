import { useEffect, useState } from "react";
import api from "../../api/axios";
import ProductCard from "../../components/ProductCard";

export default function Products() {

  const [products, setProducts] = useState([]);

  useEffect(() => {

    api.get("/api/products/")
      .then(res => setProducts(res.data));

  }, []);

  return (

    <div>

      <h1 className="text-3xl font-bold mb-6">
        All Products
      </h1>

      <div className="grid grid-cols-4 gap-6">

        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}

      </div>

    </div>
  );
}