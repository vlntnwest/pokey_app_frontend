import React, { useEffect, useState } from "react";
import AdminHeader from "../components/admin/adminComponents/AdminHeader";
import Tabs from "../components/admin/adminComponents/Tabs";
import { useAuth0 } from "@auth0/auth0-react";
import { jwtDecode } from "jwt-decode";
import { IconButton } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

const Admin = () => {
  const { getAccessTokenSilently, isAuthenticated, loginWithRedirect } =
    useAuth0();

  const [userRoles, setUserRoles] = useState([]);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (isAuthenticated) {
        try {
          const token = await getAccessTokenSilently();
          const decodedToken = jwtDecode(token);
          const roles = decodedToken["https://app.pokey-bar.fr/roles"] || [];
          setUserRoles(roles);
        } catch (error) {
          console.error("Erreur lors de la récupération des rôles :", error);
        }
      }
    };

    fetchUserRole();
  }, [isAuthenticated, getAccessTokenSilently]);

  if (isAuthenticated && userRoles.includes("Admin")) {
    return (
      <div>
        <AdminHeader />
        <Tabs />
      </div>
    );
  }

  return (
    <IconButton
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
      onClick={() =>
        loginWithRedirect({ redirectUri: window.location.origin + "/admin" })
      }
      color="primary"
    >
      <PersonIcon />
    </IconButton>
  );
};

export default Admin;
