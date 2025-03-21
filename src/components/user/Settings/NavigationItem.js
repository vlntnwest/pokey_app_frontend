import React, { useState } from "react";
import { Box, Button, Drawer, Typography } from "@mui/material";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import AccountDetails from "./AccountDetails";
import OrdersList from "./OrdersList";
import InsideDrawer from "../InsideDrawer";

const componentMap = {
  AccountDetails,
  OrdersList,
};

const NavigationItem = ({ menuItem }) => {
  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen) => () => setOpen(newOpen);

  const ComponentToRender = componentMap[menuItem.component];

  return (
    <>
      <Button
        color="secondary"
        disableElevation
        fullWidth
        sx={{
          p: 0,
          display: "block",
          mb: 2,
        }}
        onClick={toggleDrawer(true)}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Box
            sx={{
              flex: 1,
              py: 2,
              pl: 2,
              pr: 2,
              mr: "auto",
              alignItems: "flex-start",
            }}
          >
            <Typography sx={{ textAlign: "left", fontWeight: "400" }}>
              {menuItem.label}
            </Typography>
          </Box>
          <Box sx={{ ml: 2 }}>
            <Box sx={{ display: "flex", px: 2, py: 2, alignItems: "center" }}>
              <ArrowForwardIosRoundedIcon
                sx={{ ml: 1, maxHeight: "21px" }}
                color="primary"
              />
            </Box>
          </Box>
        </Box>
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)} anchor="right">
        <InsideDrawer toggleDrawer={toggleDrawer} name={menuItem.label} back>
          {ComponentToRender && <ComponentToRender />}
        </InsideDrawer>
      </Drawer>
    </>
  );
};

export default NavigationItem;
