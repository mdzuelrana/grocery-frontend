import { useEffect, useState } from "react";
import api from "../../api/axios";
import { Link } from "react-router-dom";

export default function Cart() {

  const [cart, setCart]         = useState([]);
  const [loading, setLoading]   = useState(true);
  const [removing, setRemoving] = useState(null); // track which item is being removed

  const fetchCart = () => {
    setLoading(true);
    api.get("/api/cart/")
      .then(res => setCart(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchCart(); }, []);

  const removeItem = async (id) => {
    setRemoving(id);
    try {
      await api.delete(`/api/cart/${id}/`);
      // ✅ update state directly — no need to refetch entire cart
      setCart(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to remove item. Please try again.");
    } finally {
      setRemoving(null);
    }
  };

  const totalPrice = cart.reduce(
    (total, item) => total + parseFloat(item.product_price) * item.quantity, // ✅ parseFloat — product_price may come as string
    0
  );

  if (loading) return (
    <div className="flex justify-center items-center h-[50vh]">
      <span className="loading loading-spinner loading-lg" />
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">

      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 ? (

        <div className="text-center py-16">
          <p className="text-5xl mb-4">🛒</p>
          <p className="text-gray-500 mb-4">Your cart is empty</p>
          {/* ✅ fixed link — was /products, should be inside customer dashboard */}
          <Link to="/customer-dashboard/products" className="btn btn-primary">
            Continue Shopping
          </Link>
        </div>

      ) : (

        <div className="space-y-4">

          {cart.map(item => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between border rounded-xl p-4 gap-4 bg-base-100 shadow-sm"
            >

              {/* Product Info */}
              <div className="flex items-center gap-4">
                <img
                  src={item.product_image}
                  alt={item.product_name}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg"
                  onError={e => e.target.src = "/placeholder.png"} // ✅ fallback if image broken
                />
                <div>
                  <p className="font-semibold text-sm sm:text-base">{item.product_name}</p>
                  <p className="text-gray-500 text-sm">৳ {item.product_price} × {item.quantity}</p>
                  {/* ✅ show line total per item */}
                  <p className="text-green-600 text-sm font-medium">
                    ৳ {(parseFloat(item.product_price) * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Quantity + Remove */}
              <div className="flex items-center justify-between sm:justify-end gap-6">
                <p className="font-medium">Qty: {item.quantity}</p>
                <button
                  onClick={() => removeItem(item.id)}
                  disabled={removing === item.id}
                  className="btn btn-error btn-sm"
                >
                  {removing === item.id
                    ? <span className="loading loading-spinner loading-xs" />
                    : "Remove"
                  }
                </button>
              </div>

            </div>
          ))}

          {/* Cart Summary */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-8 gap-4 border-t pt-6">
            <div>
              <p className="text-sm text-gray-500">{cart.length} item(s)</p>
              <h2 className="text-lg sm:text-xl font-bold">
                Total: ৳ {totalPrice.toFixed(2)}  {/* ✅ toFixed for clean decimals */}
              </h2>
            </div>
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