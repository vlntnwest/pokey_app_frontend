import React from "react";
import { Box } from "@mui/system";
import { PaymentElement } from "@stripe/react-stripe-js";
import PayButton from "./PayButton";

const CheckoutContent = () => {
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
      <form>
        <PaymentElement options={{ layout: "tabs" }} />
      </form>
      <PayButton />
    </Box>
  );
};

export default CheckoutContent;
