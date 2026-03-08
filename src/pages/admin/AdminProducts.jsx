import { useEffect, useState } from "react";
import API from "../../api/axios";

function AdminProducts() {

  const [products,setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await API.get("/api/products/");
    setProducts(res.data);
  };

  useEffect(()=>{
    
    fetchProducts();
  },[]);

  const deleteProduct = async(id)=>{
    if(!window.confirm("Delete this product?")) return;

    await API.delete(`/api/products/${id}/`);

    fetchProducts();
  };

  return (

    <div>

      <h1 className="text-2xl font-bold mb-6">
        Products
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        {products.map(p => (

          <div key={p.id} className="card bg-white shadow">

            <div className="card-body">

              <h2 className="font-bold">{p.name}</h2>

              <p>${p.price}</p>

              <div className="flex gap-2">

                <button className="btn btn-xs btn-info">
                  Edit
                </button>

                <button
                  className="btn btn-xs btn-error"
                  onClick={()=>deleteProduct(p.id)}
                >
                  Delete
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>

  );
}

export default AdminProducts;