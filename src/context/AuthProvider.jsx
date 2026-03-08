import { useState, useEffect } from "react";
import API from "../api/axios";
import AuthContext from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Login function
  const login = async (username, password) => {
  try {
    const res = await API.post("/auth/jwt/create/", {
      username,
      password
    });

    const { access, refresh } = res.data;

    localStorage.setItem("access", access);
    localStorage.setItem("refresh", refresh);

    const userRes = await API.get("/auth/users/me/");

    setUser(userRes.data);

    return userRes.data;

  } catch (err) {
    console.error("Login error:", err.response?.data);
    throw err;
  }
};

  // Register function
  const register = async (data) => {
    try {
      await API.post("/auth/users/", data);
    } catch (err) {
      console.error("Register error:", err.response?.data || err.message);
      throw err;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setUser(null);
  };

  // Get current logged-in user
  const getUser = async () => {
  const token = localStorage.getItem("access");

  if (!token) {
    setLoading(false);
    return;
  }

  try {
    const res = await API.get("/auth/users/me/");
    setUser(res.data);
  } catch (err) {
    console.log("Token invalid",err);
    logout();
  } finally {
    setLoading(false);
  }
};
  // On mount, try to load user if token exists
  useEffect(() => {
    getUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};