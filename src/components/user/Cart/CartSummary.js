import { Box, Card, Typography } from "@mui/material";
import React from "react";
import RecapLine from "./RecapLine";
import { useShoppingCart } from "../../Context/ShoppingCartContext";
import OrderMessage from "./OrderMessage";
import CartTimer from "./CartTimer";

const CartSummary = () => {
  const { cartItems, updateItemCount } = useShoppingCart();

  return (
    <Box
      px={2}
      pt={2}
      sx={{
        flexGrow: "1",
        backgroundColor: "rgba(208, 208, 208, 0.12)",
        overflowY: "scroll",
      }}
    >
      <Typography variant="h2" fontSize={18} pt={1} pb={2} color="textPrimary">
        Panier
      </Typography>
      <Card sx={{ border: "1px solid #0000000a" }}>
        {cartItems.map((item, index) => (
          <RecapLine
            key={index}
            item={item}
            updateItemCount={updateItemCount}
          />
        ))}
      </Card>
      <OrderMessage />
      <CartTimer />
    </Box>
  );
};

export default CartSummary;
