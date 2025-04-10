import React from "react";
import CartHeader from "./CartHeader";
import CartSummary from "./CartSummary";
import CartValidator from "./CartValidator";
import { Box } from "@mui/material";

const Cart = ({ setOpen }) => {
  return (
    <Box
      sx={{
        height: { xs: "100vh", md: "100%" },
        display: "flex",
        flexDirection: "column",
        border: "1px solid  #0000000a",
      }}
    >
      <Box
        sx={{
          flexGrow: "1",
          overflowY: "auto",
          overflowX: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CartHeader setOpen={setOpen} />
        <CartSummary />
      </Box>
      <CartValidator setOpen={setOpen} />
    </Box>
  );
};

export default Cart;
