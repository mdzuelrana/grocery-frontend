import { useEffect,useState } from "react";
import API from "../../api/axios";

function AdminReviews(){

  const [reviews,setReviews] = useState([]);

  useEffect(()=>{

    API.get("/api/reviews/")
      .then(res=>setReviews(res.data));

  },[]);

  return(

    <div>

      <h1 className="text-2xl font-bold mb-6">
        Reviews
      </h1>

      <table className="table">

        <thead>
          <tr>
            <th>User</th>
            <th>Product</th>
            <th>Rating</th>
            <th>Comment</th>
          </tr>
        </thead>

        <tbody>

          {reviews.map(r =>(

            <tr key={r.id}>
              <td>{r.user}</td>
              <td>{r.product}</td>
              <td>{r.rating}</td>
              <td>{r.comment}</td>
            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

export default AdminReviews;