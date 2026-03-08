function Categories() {

  const categories = [
    "Vegetables",
    "Fruits",
    "Dairy",
    "Meat",
    "Snacks",
    "Beverages",
  ];

  return (
    <div className="max-w-7xl mx-auto py-12 px-6">

      <h2 className="text-3xl font-bold mb-8 text-center">
        Shop by Category
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">

        {categories.map((cat, index) => (
          <div
            key={index}
            className="card bg-base-100 shadow hover:shadow-lg cursor-pointer"
          >

            <div className="card-body items-center text-center">
              <h3 className="font-semibold">{cat}</h3>
            </div>

          </div>
        ))}

      </div>
    </div>
  );
}

export default Categories;