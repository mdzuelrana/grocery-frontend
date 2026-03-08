import { useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    re_password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/users/", form);

      alert("Registration successful. Please check your email to activate your account.");

      navigate("/login");
    } catch (error) {
      console.log(error.response?.data);
      alert("Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create Account
        </h2>

        {/* Username */}
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          className="input input-bordered w-full mb-4"
          required
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="input input-bordered w-full mb-4"
          required
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="input input-bordered w-full mb-4"
          required
        />

        {/* Confirm Password */}
        <input
          type="password"
          name="re_password"
          placeholder="Confirm Password"
          onChange={handleChange}
          className="input input-bordered w-full mb-4"
          required
        />

        <button className="btn btn-success w-full">
          Register
        </button>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 cursor-pointer"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}

export default Register;