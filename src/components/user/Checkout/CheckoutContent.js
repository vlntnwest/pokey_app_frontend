import React from "react";
import { Box } from "@mui/system";
import { PaymentElement, useCheckout } from "@stripe/react-stripe-js";
import PayButton from "./PayButton";

const CheckoutContent = ({ handleSubmit, email }) => {
  const checkout = useCheckout();
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
      <pre>{JSON.stringify(checkout.lineItems, null, 2)}</pre>

      <form>
        <PaymentElement options={{ layout: "tabs" }} />
      </form>
      <PayButton handleSubmit={handleSubmit} email={email} />
    </Box>
  );
};

export default CheckoutContent;
