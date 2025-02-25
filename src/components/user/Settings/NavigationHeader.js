import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
import React from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const NavigationHeader = ({ toggleDrawer }) => {
  return (
    <>
      <Box
        style={{
          position: "sticky",
          top: "0",
          filter: "drop-shadow(0 1px 4px rgba(0, 0, 0, .08))",
          zIndex: 10,
        }}
      >
        <AppBar
          component="nav"
          sx={{
            background: "#fff",
            boxShadow: "none",
            position: "sticky",
            top: "0",
          }}
        >
          <Toolbar sx={{ padding: "0 8px" }}>
            <IconButton onClick={toggleDrawer(false)}>
              <CloseRoundedIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default NavigationHeader;
