import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Cart() {

  const { cart, removeFromCart } =
    useContext(CartContext);

  return (

    <div className="max-w-5xl mx-auto p-6">

      <h1 className="text-2xl font-bold mb-6">
        Your Cart
      </h1>

      {cart.map(item => (

        <div
          key={item.id}
          className="flex justify-between p-4 border-b"
        >

          <div>

            <h3>{item.product.name}</h3>
            <p>${item.product.price}</p>

          </div>

          <button
            className="btn btn-error btn-sm"
            onClick={() => removeFromCart(item.id)}
          >
            Remove
          </button>

        </div>

      ))}

    </div>
  );
}

export default Cart;