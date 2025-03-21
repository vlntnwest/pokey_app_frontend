import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import OrderCardHistory from "../Card/OrderCardHistory";

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
      {orders.map((order) => (
        <OrderCardHistory order={order} key={order._id} />
      ))}
    </Box>
  );
};

export default OrdersList;
