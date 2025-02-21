import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, editUser } from "../../../actions/users.action";
import { useAuth0 } from "@auth0/auth0-react";

const AccountDetails = () => {
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const { getAccessTokenSilently, logout } = useAuth0();
  const audience = process.env.REACT_APP_AUTH0_AUDIENCE;

  const [firstName, setFirstName] = useState(userData.firstName);
  const [lastName, setlastName] = useState(userData.lastName);
  const [phone, setPhone] = useState(userData.phone);

  const handleEdit = async (e) => {
    e.preventDefault();

    const data = {
      firstName: firstName,
      lastName: lastName,
      phone: phone,
    };

    try {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: audience,
          scope: "read:current_user read:users_app_metadata",
        },
      });
      dispatch(editUser(data, userData._id, token));
    } catch (err) {
      console.error("Erreur lors de la récupération du token", err);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: audience,
          scope: "read:current_user read:users_app_metadata",
        },
      });
      dispatch(deleteUser(userData._id, token));
      logout({ returnTo: window.location.origin });
    } catch (err) {
      console.error("Erreur lors de la récupération du token", err);
    }
  };

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      pb={2}
    >
      <Box
        sx={{
          backgroundColor: "white",
          borderTop: "1px solid #0000001a",
          borderBottom: "1px solid #0000001a",
        }}
        px={2}
        py={2}
        mb={2}
      >
        <TextField
          label="Prénom"
          defaultValue={firstName}
          variant="standard"
          sx={{ width: "100%", mb: 2 }}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          label="Nom"
          defaultValue={lastName}
          variant="standard"
          sx={{ width: "100%", mb: 2 }}
          onChange={(e) => setlastName(e.target.value)}
        />
        <TextField
          label="Numéro de téléphone"
          defaultValue={phone}
          variant="standard"
          sx={{ width: "100%", mb: 2 }}
          onChange={(e) => setPhone(e.target.value)}
        />
        <TextField
          label="Email"
          defaultValue={userData.email}
          variant="standard"
          helperText="Contacté le restaurant pour changer votre email"
          sx={{ width: "100%" }}
          slotProps={{
            input: {
              readOnly: true,
            },
          }}
        />
      </Box>
      <Box>
        <Button
          color="primary"
          disableElevation
          fullWidth
          sx={{
            p: 0,
            display: "block",
            borderRadius: 0,
            mb: 4,
          }}
          onClick={handleEdit}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              borderTop: "1px solid #0000001a",
              borderBottom: "1px solid #0000001a",
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
              <Typography sx={{ fontWeight: "400" }}>Enregistrer</Typography>
            </Box>
          </Box>
        </Button>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            color="none"
            disableElevation
            sx={{
              p: 0,
              display: "block",
            }}
            onClick={handleDelete}
          >
            <Typography
              sx={{
                textTransform: "none",
                color: "rgba(0, 0, 0, 0.6);",
                fontSize: "0.75rem",
                fontWeight: "400",
                textDecoration: "underline",
              }}
            >
              Supprimer le compte
            </Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AccountDetails;
