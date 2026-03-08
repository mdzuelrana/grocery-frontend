import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";

function Products() {

  const [products, setProducts] = useState([]);

  useEffect(() => {

    const fetchProducts = async () => {
      try {

        const res = await API.get("/api/products/");

        // DRF pagination support
        if (res.data.results) {
          setProducts(res.data.results);
        } else {
          setProducts(res.data);
        }

      } catch (error) {
        console.log("Product fetch error:", error);
      }
    };

    fetchProducts();

  }, []);

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto p-6">

        <h1 className="text-3xl font-bold mb-6">
          Grocery Products
        </h1>

        {products.length === 0 ? (
          <p className="text-gray-500">
            No products available
          </p>
        ) : (

          <div
            className="grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            gap-6"
          >

            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}

          </div>

        )}

      </div>
    </>
  );
}

export default Products;