import React from "react";
import { Box } from "@mui/system";
import { PaymentElement, useCheckout } from "@stripe/react-stripe-js";
import PayButton from "./PayButton";
import { Typography } from "@mui/material";
import { useShoppingCart } from "../../Context/ShoppingCartContext";

const CheckoutContent = ({ handleSubmit, email }) => {
  const checkout = useCheckout();
  const unitAmount = JSON.stringify(checkout.total.total, null, 2);
  const totalPrice = (unitAmount / 100).toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR",
  });

  const { selectedDate } = useShoppingCart();

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      p={2}
    >
      <Box>
        <Box
          sx={{
            backgroundColor: "white",
            border: "1px solid #0000001a",
            borderRadius: 1,
          }}
          px={1.5}
          py={1.5}
          mb={2}
        >
          Commande à prête pour {selectedDate.time}
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            pb: 2,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="body1"
              color="textPrimary"
              sx={{ fontWeight: 700 }}
            >
              Total de la commande
            </Typography>
          </Box>
          <Box>
            <Typography color="textPrimary" sx={{ fontWeight: 700 }}>
              {totalPrice}
            </Typography>
          </Box>
        </Box>

        <form>
          <PaymentElement options={{ layout: "tabs" }} />
        </form>
      </Box>
      <PayButton handleSubmit={handleSubmit} email={email} />
    </Box>
  );
};

export default CheckoutContent;
