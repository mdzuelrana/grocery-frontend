import { useEffect, useState } from "react";
import API from "../../api/axios";

function AdminCustomers(){

  const [users,setUsers] = useState([]);

  useEffect(()=>{

    API.get("/auth/users/")
      .then(res=>setUsers(res.data));

  },[]);

  return(

    <div>

      <h1 className="text-2xl font-bold mb-6">
        Customers
      </h1>

      <table className="table">

        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>

        <tbody>

          {users.map(u =>(

            <tr key={u.id}>

              <td>{u.id}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

export default AdminCustomers;