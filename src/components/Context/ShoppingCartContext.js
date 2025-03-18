import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ShoppingCartContext = createContext({});

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export default function ShoppingCartProvider({ children }) {
  const location = useLocation();
  const [isClickAndCollect, setIsClickAndCollect] = useState(false);

  const [cartItems, setCartItems] = useState(() => {
    const storedCart = sessionStorage.getItem("Cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const [message, setMessage] = useState("Aucune indication renseignée");
  const [selectedDate, setSelectedDate] = useState({
    date: "",
    time: "",
  });
  const [selectedDay, setSelectedDay] = useState("now");

  const addToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  const updateItemCount = (itemId, newCount) => {
    if (newCount === 0) {
      removeFromCart(itemId);
    } else {
      const updatedCart = cartItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newCount } : item
      );
      setCartItems(updatedCart);
    }
  };

  const removeFromCart = (id) => {
    setCartItems((currentItems) => {
      return currentItems.filter((item) => item.id !== id);
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  useEffect(() => {
    sessionStorage.setItem("Cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const cartItems = sessionStorage.getItem("Cart");
    if (cartItems) {
      setCartItems(JSON.parse(cartItems));
    }
  }, []);

  useEffect(() => {
    if (location.pathname.includes("table")) {
      setIsClickAndCollect(false);
    } else {
      setIsClickAndCollect(true);
    }
  }, [location.pathname]);

  return (
    <ShoppingCartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateItemCount,
        removeFromCart,
        clearCart,
        message,
        setMessage,
        selectedDate,
        setSelectedDate,
        selectedDay,
        setSelectedDay,
        isClickAndCollect,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}
