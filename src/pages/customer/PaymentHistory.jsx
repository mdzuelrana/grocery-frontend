import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function PaymentHistory() {

  const [payments, setPayments] = useState([]);
  const [days, setDays] = useState(15);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const fetchPayments = async () => {

      try {
        setLoading(true);

        const res = await api.get(`/api/payment/history/?days=${days}`);

        setPayments(res.data);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }

    };

    fetchPayments();

  }, [days]);

  return (

    <div className="p-4">

      <h1 className="text-2xl font-bold mb-4">
        Payment History
      </h1>

      {/* FILTER */}
      <div className="mb-4 flex gap-2">

        <button
          onClick={() => setDays(15)}
          className={`btn btn-sm ${days === 15 ? "btn-primary" : ""}`}
        >
          Last 15 Days
        </button>

        <button
          onClick={() => setDays(30)}
          className={`btn btn-sm ${days === 30 ? "btn-primary" : ""}`}
        >
          Last 30 Days
        </button>

      </div>

      {/* LOADING */}
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (

        <div className="overflow-x-auto">

          <table className="table w-full">

            <thead>
              <tr>
                <th>Transaction</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>

              {payments.length === 0 ? (

                <tr>
                  <td colSpan="4" className="text-center">
                    No payments found
                  </td>
                </tr>

              ) : (

                payments.map((p) => (

                  <tr key={p.id}>
                    <td>{p.transaction_id}</td>
                    <td>৳ {p.amount}</td>

                    <td>
                      <span className={`badge ${
                        p.status === "completed"
                          ? "badge-success"
                          : p.status === "pending"
                          ? "badge-warning"
                          : "badge-error"
                      }`}>
                        {p.status}
                      </span>
                    </td>

                    <td>
                      {new Date(p.created_at).toLocaleString()}
                    </td>
                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      )}

    </div>
  );
}