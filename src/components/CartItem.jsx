import api from "../api/axios";

export default function CartItem({ item, refreshCart }) {

  const updateQty = async (qty) => {

    if (qty < 1) return;

    await api.patch(`/api/cart/${item.id}/`, {
      quantity: qty,
    });

    refreshCart();
  };

  const removeItem = async () => {

    await api.delete(`/api/cart/${item.id}/`);

    refreshCart();
  };

  return (

    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border rounded-lg p-4 gap-4 bg-base-100 shadow-sm">

      {/* Product Info */}
      <div className="flex items-center gap-4">

        <img
          src={item.product_image}
          alt={item.product_name}
          className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded"
        />

        <div>
          <h3 className="font-semibold text-sm sm:text-base">
            {item.product_name}
          </h3>

          <p className="text-sm text-gray-600">
            ${item.price}
          </p>
        </div>

      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-3">

        <button
          className="btn btn-sm btn-outline"
          onClick={() => updateQty(item.quantity - 1)}
        >
          -
        </button>

        <span className="font-medium">
          {item.quantity}
        </span>

        <button
          className="btn btn-sm btn-outline"
          onClick={() => updateQty(item.quantity + 1)}
        >
          +
        </button>

      </div>

      {/* Remove Button */}
      <div className="flex sm:block">

        <button
          onClick={removeItem}
          className="btn btn-error btn-sm w-full sm:w-auto"
        >
          Remove
        </button>

      </div>

    </div>
  );
}