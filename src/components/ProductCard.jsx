import API from "../api/axios";

function ProductCard({ product }) {

  const addToCart = async () => {
    try {
      await API.post("/api/cart/", {
        product: product.id,
        quantity: 1
      });

      alert("Added to Cart");
    } catch (error) {
      console.log(error?.response?.data);
      alert("Please login first");
    }
  };

  const addToWishlist = async () => {
    try {
      await API.post("/api/wishlist/", {
        product: product.id
      });

      alert("Added to Wishlist");
    } catch (error) {
      console.log(error?.response?.data);
      alert("Please login first");
    }
  };

  return (
    <div className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300 h-full">

      {/* Image */}
      <figure className="overflow-hidden aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition duration-300"
        />
      </figure>

      {/* Body */}
      <div className="card-body p-4 flex flex-col">

        {/* Product Name */}
        <h2 className="card-title text-sm sm:text-base line-clamp-1">
          {product.name}
        </h2>

        {/* Description */}
        <p className="text-xs sm:text-sm text-gray-500 line-clamp-2 flex-grow">
          {product.description}
        </p>

        {/* Price */}
        <p className="font-bold text-green-600 text-base sm:text-lg mt-2">
          ৳ {product.price}
        </p>

        {/* Buttons */}
        <div className="card-actions flex gap-1 mt-3">

          <button
            onClick={addToCart}
            className="btn btn-primary btn-sm flex-1"
          >
            Add to Cart
          </button>

          <button
            onClick={addToWishlist}
            className="btn btn-outline btn-sm flex-1"
          >
            Wishlist
          </button>
          

        </div>

      </div>
    </div>
  );
}

export default ProductCard;