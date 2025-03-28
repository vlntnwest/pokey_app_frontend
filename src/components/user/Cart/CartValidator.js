import {
  Box,
  Button,
  CircularProgress,
  Drawer,
  Link,
  Modal,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useShoppingCart } from "../../Context/ShoppingCartContext";
import InsideDrawer from "../InsideDrawer";
import CheckoutForm from "../Checkout/CheckoutForm";
import { useAuth0 } from "@auth0/auth0-react";
import FullWidthBtn from "../../Buttons/FullWidthBtn";
import { formatPrice } from "../../Utils";
import { useShop } from "../../Context/ShopContext";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  borderRadius: 1,
  minWidth: 300,
};

const CartValidator = ({ setOpen }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const { isAuthenticated, loginWithRedirect } = useAuth0();

  const [openCheckout, setOpenCheckout] = useState(false);
  const toggleDrawer = (newOpen) => () => setOpenCheckout(newOpen);
  const [isGuest, setIsGuest] = useState(false);
  const { handleOpenCompletedOrderModal, setOrderTime } = useShop();

  const {
    cartItems,
    clearCart,
    setMessage,
    selectedDate,
    setSelectedDate,
    selectedDay,
    isClickAndCollect,
  } = useShoppingCart();

  const { calculOrderTimeRange } = useShop();

  const calculateTotalPrice = () => {
    const total = cartItems.map((item) => {
      const elPrice =
        (formatPrice(item.price) +
          (item.extraProteinPrice ? parseFloat(item.extraProteinPrice) : 0)) *
        item.quantity;
      return elPrice;
    });

    return total.reduce((acc, curr) => acc + curr).toFixed(2);
  };

  const handleSubmit = async (id) => {
    setIsSubmitting(true);

    if (!cartItems.length) {
      // Check if cart is empty
      console.error("Aucune donnée dans le panier");
      setIsSubmitting(false);
      return;
    }

    setOrderTime(`${selectedDate.date} à ${selectedDate.time}`);
    handleOpenCompletedOrderModal();

    clearCart();
    setOpen(false);
    setIsSubmitting(false);
    setMessage("");
    setSelectedDate({
      date: "Aujourd'hui",
      time: "",
    });
  };

  const handleCheckout = () => {
    if (selectedDay === "now") {
      setSelectedDate({ date: "Aujourd'hui", time: calculOrderTimeRange() });
    }
    if (!isAuthenticated) {
      handleOpenModal();
    } else {
      setOpenCheckout(true);
    }
  };

  const handleGuestCheckout = () => {
    setIsGuest(true);
    setOpenCheckout(true);
    handleCloseModal();
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
          <CheckoutForm handleSubmit={handleSubmit} isGuest={isGuest} />
        </InsideDrawer>
      </Drawer>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Souhaite-vous vous identifier ?
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              mt: 2,
              gap: 1,
              alignItems: "center",
            }}
          >
            <FullWidthBtn
              handleAction={() => loginWithRedirect()}
              name={"S'identifier"}
            />

            <Link onClick={() => handleGuestCheckout()}>
              Continuer en tant qu'invité
            </Link>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default CartValidator;
