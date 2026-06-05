import { useEffect, useState } from "react";
import { handlefetchCart } from "../lib/cart";
import useAuth from "./useAuth";

export default function useCartCount() {

  const {loggedIn, user} = useAuth();

  const [count, setCount] = useState(0);

  useEffect(() => {
  const syncCart = async () => {
    const updatedCart = !loggedIn
      ? JSON.parse(localStorage.getItem("cart")) || []
      : await handlefetchCart(user);

    const q = updatedCart.reduce(
      (sum, item) => sum + (item.quantity || 1),
      0
    );

    setCount(q);
  };

  syncCart();

  window.addEventListener("cartUpdated", syncCart);

  return () => {
    window.removeEventListener("cartUpdated", syncCart);
  };
}, [loggedIn, user]);

  return count;
}