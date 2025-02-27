import { Box, Link } from "@mui/material";
import React from "react";
import NavigationItem from "./NavigationItem";
import { useAuth0 } from "@auth0/auth0-react";

const NavigationMenu = () => {
  const { logout } = useAuth0();

  const menuItems = [
    { label: "Détails du compte", component: "AccountDetails" },
    { label: "Commandes", component: "OrdersList" },
  ];
  return (
    <Box
      px={2}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        pb: 2,
      }}
    >
      <Box>
        {menuItems.map((menuItem, index) => (
          <NavigationItem key={index} menuItem={menuItem} />
        ))}
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Link
          sx={{
            textTransform: "none",
            color: "rgba(0, 0, 0, 0.6);",
            fontSize: "0.75rem",
            fontWeight: "400",
            textDecoration: "underline",
          }}
          onClick={logout}
        >
          Se déconnecter
        </Link>
      </Box>
    </Box>
  );
};

export default NavigationMenu;
