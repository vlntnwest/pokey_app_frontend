import React from "react";
import NavigationHeader from "./Settings/NavigationHeader";
import { Box } from "@mui/material";

const InsideDrawer = ({ toggleDrawer, children }) => {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100dvh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <NavigationHeader toggleDrawer={toggleDrawer} />
      <Box
        pt={2}
        sx={{ flexGrow: "1", backgroundColor: "rgba(208, 208, 208, 0.12)" }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default InsideDrawer;
