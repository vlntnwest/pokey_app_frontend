import React from "react";
import ItemsList from "../../admin/OrdersComponents/ItemList";
import { Card, CardContent, Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { isEmpty } from "../../Utils";

const OrderCardHistory = ({ order }) => {
  const { items, specialInstructions, orderDate, orderNumber } = order;
  return (
    <Card sx={{ minWidth: 275, mb: 2 }}>
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body2">
            {orderDate.date} - {orderDate.time}
          </Typography>{" "}
          <Typography variant="body2" fontWeight={700}>
            {orderNumber}
          </Typography>
        </Box>
        <Divider sx={{ my: 1 }} />
        {items.map((item, index) => (
          <ItemsList key={index} item={item} />
        ))}
        {!isEmpty(specialInstructions) && (
          <Box>
            <Divider sx={{ my: 1 }} />
            <Typography sx={{ color: "text.secondary" }}>Comments</Typography>
            <Typography variant="body2">{specialInstructions}</Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default OrderCardHistory;
