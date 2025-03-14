import { Box, Radio, RadioGroup, Typography } from "@mui/material";
import React, { useState } from "react";
import OrderDate from "./OrderDate";

const CartTimer = () => {
  const [selectedValue, setSelectedValue] = useState("now");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const controlProps = (item) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: "color-radio-button-demo",
    inputProps: { "aria-label": item },
  });

  return (
    <div>
      <Box
        color="secondary"
        sx={{
          mt: 2,
          padding: "12px 16px 12px 12px",
          border: "1px solid #0000000a",
          textTransform: "none",
          flexDirection: "column",
          color: "rgba(0, 0, 0, 0.87)",
          backgroundColor: "white",
        }}
      >
        <RadioGroup
          aria-labelledby="delivery-timing-label"
          value={selectedValue}
          name="delivery-timing-group"
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            onClick={() => setSelectedValue("now")}
          >
            <Typography variant="body1">Maintenant</Typography>
            <Radio {...controlProps("now")} />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            onClick={() => setSelectedValue("after")}
          >
            <Typography variant="body1">Plus tard</Typography>
            <Radio {...controlProps("after")} />
          </Box>
        </RadioGroup>
        <Box>{selectedValue === "after" && <OrderDate />}</Box>
      </Box>
    </div>
  );
};

export default CartTimer;
