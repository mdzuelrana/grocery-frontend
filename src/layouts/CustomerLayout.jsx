import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function CustomerLayout() {
  return (
    <div>

      <Navbar />

      <div className="max-w-7xl mx-auto p-6">

        <Outlet />

      </div>

    </div>
  );
}