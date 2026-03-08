
import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const Login = () => {

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const loggedUser = await login(username, password);

      if (loggedUser.role === "admin") {
        navigate("/admin");
      }
      else if (loggedUser.role === "seller") {
        navigate("/seller/dashboard");
      }
      else {
        navigate("/customer-dashboard");
      }

    } catch {
      alert("Login failed");
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">

      <div className="w-full max-w-md bg-base-100 shadow-xl rounded-xl p-8">

        <h2 className="text-2xl font-bold text-center mb-6">
          Login to your account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="input input-bordered w-full"
            required
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="input input-bordered w-full"
            required
          />

          <button className="btn btn-primary w-full">
            Login
          </button>

        </form>

        {/* Register Option */}
        <p className="text-center text-sm text-gray-500 mt-6">

          Don't have an account?{" "}

          <Link
            to="/register"
            className="text-primary font-semibold hover:underline"
          >
            Register
          </Link>

        </p>

      </div>

    </div>

  );
};

export default Login;

