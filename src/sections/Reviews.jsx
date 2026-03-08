function Reviews() {

  const reviews = [
    {
      name: "Rahim",
      text: "Great grocery quality and fast delivery!"
    },
    {
      name: "Karim",
      text: "Very fresh vegetables and fruits."
    },
    {
      name: "Fatema",
      text: "Best grocery shop online."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto py-12 px-6">

      <h2 className="text-3xl font-bold mb-8 text-center">
        Customer Reviews
      </h2>

      <div className="grid md:grid-cols-3 gap-6">

        {reviews.map((r,i) => (
          <div key={i} className="card bg-base-100 shadow">

            <div className="card-body">

              <p>"{r.text}"</p>

              <h4 className="font-bold mt-4">
                {r.name}
              </h4>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
}

export default Reviews;