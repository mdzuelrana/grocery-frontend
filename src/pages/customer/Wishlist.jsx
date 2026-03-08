import { useEffect, useState } from "react";
import api from "../../api/axios";
import EmptyState from "../../components/EmptyState";

export default function Wishlist() {

  const [items, setItems] = useState([]);

  const fetchWishlist = () => {
    api.get("/api/wishlist/")
      .then(res => setItems(res.data));
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const removeItem = async (id) => {
    await api.delete(`/api/wishlist/${id}/`);
    fetchWishlist();
  };

  if (!items.length) {
    return (
      <EmptyState
        title="Wishlist Empty"
        message="Save products you like for later"
        link="/customer-dashboard/products"
        linkText="Browse Products"
      />
    );
  }

  return (

    <div>

      <h1 className="text-2xl font-bold mb-6">
        My Wishlist
      </h1>

      <div className="grid grid-cols-4 gap-6">

        {items.map(item => (

          <div
            key={item.id}
            className="card bg-base-100 shadow"
          >

            <figure className="h-40 overflow-hidden">
              <img
                src={item.product_image}
                className="object-cover w-full"
              />
            </figure>

            <div className="card-body">

              <h2 className="card-title text-lg">
                {item.product_name}
              </h2>

              <p className="text-green-600 font-bold">
                ৳ {item.product_price}
              </p>

              <button
                onClick={() => removeItem(item.id)}
                className="btn btn-error btn-sm"
              >
                Remove
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}