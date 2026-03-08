import { useEffect, useState } from "react";
import API from "../api/axios";
import ProductCard from "../components/ProductCard";

function FeaturedProducts() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchProducts = async () => {
      try {
        const res = await API.get("/api/products/");
        setProducts(res.data.slice(0,4));
      } catch (error) {
        console.log("Product fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

  }, []);

  return (

    <section className="bg-base-100 py-10 sm:py-12 lg:py-16">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between mb-8">

          <h2 className="text-2xl sm:text-3xl font-bold">
            Featured Products
          </h2>

        </div>

        {loading ? (

          <div className="text-center py-10">
            <span className="loading loading-spinner loading-lg"></span>
          </div>

        ) : products.length === 0 ? (

          <p className="text-center text-gray-500">
            No products available
          </p>

        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}

          </div>

        )}

      </div>

    </section>

  );
}

export default FeaturedProducts;