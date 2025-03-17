import React from "react";
import { Box } from "@mui/system";
import { PaymentElement } from "@stripe/react-stripe-js";
import PayButton from "./PayButton";

const CheckoutContent = ({ handleSubmit }) => {
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
      <PayButton handleSubmit={handleSubmit} />
    </Box>
  );
};

export default CheckoutContent;
