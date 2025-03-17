import {
  Box,
  Button,
  CircularProgress,
  Drawer,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useShoppingCart } from "../../Context/ShoppingCartContext";
import InsideDrawer from "../InsideDrawer";
import CheckoutForm from "../Checkout/CheckoutForm";
import { useAuth0 } from "@auth0/auth0-react";

const CartValidator = ({ setOpen }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { tableNumber } = useParams();
  const location = useLocation();

  const { isAuthenticated, loginWithRedirect } = useAuth0();

  const [isClickAndCollect, setIsClickAndCollect] = useState(false);

  const [openCheckout, setOpenCheckout] = useState(false);
  const toggleDrawer = (newOpen) => () => setOpenCheckout(newOpen);

  useEffect(() => {
    if (location.pathname.includes("table")) {
      setIsClickAndCollect(false);
    } else {
      setIsClickAndCollect(true);
    }
  }, [location.pathname]);

  const {
    cartItems,
    clearCart,
    message,
    setMessage,
    selectedDate,
    setSelectedDate,
  } = useShoppingCart();

  let orderType = "";

  if (location.pathname.includes("clickandcollect")) {
    orderType = "clickandcollect";
  } else if (tableNumber) {
    orderType = "dine-in";
  } else {
    orderType = "clickandcollect";
  }

  const addedProteins = cartItems.map((item) =>
    item.extraProtein ? item.extraProtein.length : 0
  );

  const calculateTotalPrice = () => {
    return cartItems
      .reduce((total, item, index) => {
        const price = parseFloat(item.price.replace(",", "."));

        return (
          total +
          price * item.quantity +
          addedProteins[index] *
            addedProteins[index] *
            (item.extraProteinPrice || 0)
        );
      }, 0)
      .toFixed(2);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    if (!cartItems.length) {
      // Check if cart is empty
      console.error("Aucune donnée dans le panier");
      setIsSubmitting(false);
      return;
    }

    const items = cartItems.map((item) => {
      const meal = {
        type: item.type,
        name: item.name,
        base: item.base,
        proteins: item.proteins,
        extraProtein: item.extraProtein,
        extraProteinPrice: item.extraProteinPrice,
        garnishes: item.garnishes,
        toppings: item.toppings,
        sauces: item.sauces,
        quantity: item.quantity,
      };
      return meal;
    });

    const dataToPrint = {
      orderType,
      ...(orderType === "dine-in" && { tableNumber }),
      items: items,
      specialInstructions: message,
      orderDate: selectedDate,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}api/order`,
        dataToPrint
      );
      console.log("Commande créée avec succès:", response.data);
    } catch (error) {
      console.error(
        "Erreur lors de l'envoi des données à l'API:",
        error.response?.data || error.message
      );
    }
    // try {
    //   const response = await axios.post(
    //     `${process.env.REACT_APP_API_URL}api/order/print-order`,
    //     { orderData: dataToPrint }
    //   );
    //   console.log("Commande envoyée avec succès:", response.data);
    // } catch (error) {
    //   console.error(
    //     "Erreur lors de l'envoi des données à l'API:",
    //     error.response?.data || error.message
    //   );
    // }
    clearCart();
    setOpen(false);
    setIsSubmitting(false);
    setMessage("");
    setSelectedDate({
      date: "Aujourd'hui",
      time: "",
    });
  };

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      await loginWithRedirect();
    } else {
      setOpenCheckout(true);
    }
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
          backgroundColor: "#fff",
          p: 2,
          filter: "drop-shadow(0 1px 4px rgba(0, 0, 0, .08))",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            pb: 2,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" color="textPrimary">
              Total de la commande
            </Typography>
          </Box>
          <Box>
            <Typography color="textPrimary">
              {calculateTotalPrice().replace(".", ",")}€
            </Typography>
          </Box>
        </Box>
        <Button
          variant="contained"
          fullWidth
          sx={{ py: 1.5 }}
          onClick={isClickAndCollect ? handleCheckout : handleSubmit}
        >
          {isClickAndCollect ? (
            "Finaliser la commande"
          ) : isSubmitting ? (
            <CircularProgress color="secondary" size={24.5} />
          ) : (
            "Finaliser la commande"
          )}
        </Button>
      </Box>
      <Drawer open={openCheckout} onClose={toggleDrawer(false)} anchor="right">
        <InsideDrawer toggleDrawer={toggleDrawer}>
          <CheckoutForm handleSubmit={handleSubmit} />
        </InsideDrawer>
      </Drawer>
    </div>
  );
};

export default CartValidator;
