function BestSellers() {

  const items = [
    "Organic Apple",
    "Fresh Milk",
    "Chicken Breast",
    "Brown Bread",
  ];

  return (
    <div className="bg-base-200 py-12">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-3xl font-bold mb-8">
          Best Sellers
        </h2>

        <div className="grid md:grid-cols-4 gap-6">

          {items.map((item, i) => (
            <div key={i} className="card bg-base-100 shadow">

              <div className="card-body text-center">

                <h3 className="font-semibold">
                  {item}
                </h3>

                <button className="btn btn-primary btn-sm mt-2">
                  View
                </button>

              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

export default BestSellers;