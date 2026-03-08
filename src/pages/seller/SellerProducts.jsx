import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import API from "../../api/axios";
import SellerSidebar from "./SellerSidebar";

function SellerProducts(){

  const [products,setProducts] = useState([]);

  useEffect(()=>{

    API.get("/api/products/")
      .then(res=>setProducts(res.data));

  },[]);

  const deleteProduct = async(id)=>{

    if(!window.confirm("Delete product?")) return;

    await API.delete(`/api/products/${id}/`);

    setProducts(products.filter(p=>p.id!==id));
  }

  return(

    <div className="flex">

      <SellerSidebar/>

      <div className="p-6 flex-1">

        <h1 className="text-2xl font-bold mb-6">
          My Products
        </h1>

        <Link
          to="/seller/products/add"
          className="btn btn-primary mb-4"
        >
          Add Product
        </Link>

        <table className="table">

          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {products.map(p=>(
              <tr key={p.id}>

                <td>{p.name}</td>
                <td>{p.price}</td>

                <td className="space-x-2">

                  <Link
                    to={`/seller/products/edit/${p.id}`}
                    className="btn btn-xs btn-info"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={()=>deleteProduct(p.id)}
                    className="btn btn-xs btn-error"
                  >
                    Delete
                  </button>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>

  )

}

export default SellerProducts