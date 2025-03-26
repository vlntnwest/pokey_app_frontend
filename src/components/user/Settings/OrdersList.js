import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Box, Card } from "@mui/material";
import OrderCardHistory from "../Card/OrderCardHistory";
import { isEmpty } from "../../Utils";

const OrdersList = () => {
  const user = useSelector((state) => state.userReducer);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}api/order/history/${user._id}`
        );
        setOrders(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrders();
  }, [user._id]);

  const sortedOrders = !isEmpty(orders)
    ? [...orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    : [];

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: 1200,
        width: "100%",
      }}
      px={2}
    >
      <Card sx={{ border: "1px solid #0000000a", width: "100%" }}>
        {sortedOrders.map((order, index) => (
          <OrderCardHistory
            order={order}
            key={order._id}
            isLast={index === orders.length - 1}
          />
        ))}
      </Card>
    </Box>
  );
};

export default OrdersList;
