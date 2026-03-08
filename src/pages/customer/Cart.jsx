import { useEffect, useState } from "react";
import api from "../../api/axios";
import { Link } from "react-router-dom";

export default function Cart() {

  const [cart, setCart] = useState([]);

  const fetchCart = () => {
    api.get("/api/cart/")
      .then(res => setCart(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const removeItem = async (id) => {
    await api.delete(`/api/cart/${id}/`);
    fetchCart();
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.product_price * item.quantity,
    0
  );

  return (

    <div className="max-w-5xl mx-auto px-4 py-8">

      <h1 className="text-2xl sm:text-3xl font-bold mb-6">
        Your Cart
      </h1>

      {cart.length === 0 ? (

        <div className="text-center py-12">

          <p className="text-gray-500 mb-4">
            Your cart is empty
          </p>

          <Link
            to="/products"
            className="btn btn-primary"
          >
            Continue Shopping
          </Link>

        </div>

      ) : (

        <div className="space-y-4">

          {cart.map(item => (

            <div
              key={item.id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between border rounded-lg p-4 gap-4 bg-base-100 shadow-sm"
            >

              {/* Product Info */}
              <div className="flex items-center gap-4">

                <img
                  src={item.product_image}
                  alt={item.product_name}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded"
                />

                <div>
                  <p className="font-semibold text-sm sm:text-base">
                    {item.product_name}
                  </p>

                  <p className="text-gray-500 text-sm">
                    ৳ {item.product_price}
                  </p>
                </div>

              </div>

              {/* Quantity + Remove */}
              <div className="flex items-center justify-between sm:justify-end gap-6">

                <p className="font-medium">
                  Qty: {item.quantity}
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

          {/* Cart Summary */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-8 gap-4 border-t pt-6">

            <h2 className="text-lg sm:text-xl font-bold">
              Total: ৳ {totalPrice}
            </h2>

            <Link
              to="/customer-dashboard/checkout"
              className="btn btn-primary w-full sm:w-auto"
            >
              Proceed to Checkout
            </Link>

          </div>

        </div>

      )}

    </div>

  );
}