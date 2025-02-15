import React, { useEffect } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { getUser } from "../../../actions/users.action";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";

const AccountDetails = () => {
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      if (isAuthenticated && user?.email) {
        try {
          const token = await getAccessTokenSilently();
          dispatch(getUser(user.email, token));
        } catch (err) {
          console.error("Erreur lors de la récupération du token", err);
        }
      }
    };

    fetchUser();
  }, [isAuthenticated, user?.email, getAccessTokenSilently, dispatch]);
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
          defaultValue="Valentin"
          variant="standard"
          sx={{ width: "100%", mb: 2 }}
        />
        <TextField
          label="Nom"
          defaultValue="Westermeyer"
          variant="standard"
          sx={{ width: "100%", mb: 2 }}
        />
        <TextField
          label="Numéro de téléphone"
          defaultValue="06 03 75 14 57"
          variant="standard"
          sx={{ width: "100%", mb: 2 }}
        />
        <TextField
          label="Email"
          defaultValue="valentin@westermeyer.fr"
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
