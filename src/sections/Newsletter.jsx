function Newsletter() {

  return (
    <div className="bg-primary text-white py-12">

      <div className="max-w-4xl mx-auto text-center">

        <h2 className="text-3xl font-bold mb-4">
          Get Special Offers
        </h2>

        <p className="mb-6">
          Subscribe to receive grocery deals and discounts.
        </p>

        <div className="flex justify-center gap-2">

          <input
            type="email"
            placeholder="Enter your email"
            className="input input-bordered text-black"
          />

          <button className="btn btn-secondary">
            Subscribe
          </button>

        </div>

      </div>

    </div>
  );
}

export default Newsletter;