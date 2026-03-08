
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="hero min-h-[500px] bg-base-200">

      <div className="hero-content flex-col lg:flex-row gap-10">

        <img
          src="https://images.unsplash.com/photo-1542838132-92c53300491e"
          alt="Fresh Grocery"
          className="max-w-sm md:max-w-md rounded-lg shadow-2xl w-full"
        />

        <div className="max-w-lg">

          <h1 className="text-3xl md:text-5xl font-bold">
            Fresh Grocery Delivered
          </h1>

          <p className="py-6 text-gray-600">
            Buy fresh vegetables, fruits, and daily groceries
            directly from trusted sellers. Fast delivery and
            best quality guaranteed.
          </p>

          <Link to="/register" className="btn btn-primary">
            Shop Now
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Hero;

