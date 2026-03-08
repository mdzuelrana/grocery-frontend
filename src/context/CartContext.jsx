import { createContext, useState, useEffect } from "react";
import API from "../api/axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [cart, setCart] = useState([]);

  const fetchCart = async () => {
    const res = await API.get("/api/cart/");
    setCart(res.data);
  };

  const addToCart = async (productId) => {

    await API.post("/api/cart/", {
      product: productId,
      quantity: 1
    });
 

    fetchCart();
  };

  const removeFromCart = async (id) => {

    await API.delete(`/api/cart/${id}/`);

    fetchCart();
  };

  useEffect(() => {
   
    fetchCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};