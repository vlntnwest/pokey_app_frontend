import React from "react";
import { Button, Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { formatEuros } from "../../Utils";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

const OrderCardHistory = ({ order, isLast }) => {
  const {
    items,
    specialInstructions,
    orderDate,
    orderNumber,
    createdAt,
    totalPrice,
  } = order;

  const isoDate = new Date(createdAt);
  const localedateformat = isoDate.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <>
      <Button
        color="secondary"
        disableElevation
        fullWidth
        sx={{
          p: 0,
          display: "block",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ mr: 1.5, pl: 2, py: 1.5, textAlign: "left" }}>
            <Typography variant="h3" sx={{ textTransform: "none" }}>
              Commande #{orderNumber}
            </Typography>
            <Typography variant="body2" sx={{ textTransform: "none" }}>
              {formatEuros(totalPrice)} • {localedateformat}
            </Typography>
          </Box>
          <Box sx={{ display: "flex" }} p={2} ml={1}>
            <ArrowForwardIosRoundedIcon
              sx={{ ml: 1, maxHeight: "21px" }}
              color="primary"
            />
          </Box>
        </Box>
      </Button>
      {!isLast && (
        <Divider variant="middle" sx={{ borderColor: "#0000000a" }} />
      )}
    </>
  );
};

export default OrderCardHistory;
