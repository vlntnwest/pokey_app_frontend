import { Box, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import FullWidthBtn from "../../Buttons/FullWidthBtn";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { editUser, getUser } from "../../../actions/users.action";

const Onboarding = ({ setIsNewUser }) => {
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState(userData.firstName);
  const [lastName, setLastName] = useState(userData.lastName);
  const [phone, setPhone] = useState(userData.phone);

  const { getAccessTokenSilently, user } = useAuth0();
  const audience = process.env.REACT_APP_AUTH0_AUDIENCE;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await getAccessTokenSilently({
          authorizationParams: {
            audience: audience,
            scope: "read:current_user read:users_app_metadata",
          },
        });
        dispatch(getUser(user.email, token));
      } catch (err) {
        console.error("Erreur lors de la récupération du token", err);
      }
    };
    fetchUser();
  }, [user.email, dispatch, getAccessTokenSilently, audience]);

  const handleEdit = async (e) => {
    e.preventDefault();

    const data = {
      firstName: firstName,
      lastName: lastName,
      phone: phone,
    };

    if (!data.firstName || !data.lastName || !data.phone) {
      return;
    }

    try {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: audience,
          scope: "read:current_user read:users_app_metadata",
        },
      });
      dispatch(editUser(data, userData._id, token));
      setIsNewUser(false);
    } catch (err) {
      console.error("Erreur lors de la récupération du token", err);
    }
  };

  return (
    <Box style={{ height: "100%" }}>
      <Box>
        <Box
          component="img"
          sx={{
            display: "block",
            width: 120,
            margin: "0 auto",
          }}
          alt="The house from the offer."
          src="https://g10afdaataaj4tkl.public.blob.vercel-storage.com/img/1Fichier-21.svg"
        />
        <Typography variant="h2" sx={{ textAlign: "center" }}>
          Petite phrase pour dire bonjour
        </Typography>
      </Box>
      <Box>
        <TextField
          label="Prénom"
          required
          defaultValue={firstName}
          variant="standard"
          sx={{ width: "100%", mb: 2 }}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          label="Nom"
          required
          defaultValue={lastName}
          variant="standard"
          sx={{ width: "100%", mb: 2 }}
          onChange={(e) => setLastName(e.target.value)}
        />
        <TextField
          label="Téléphone"
          required
          defaultValue={lastName}
          variant="standard"
          sx={{ width: "100%", mb: 2 }}
          onChange={(e) => setPhone(e.target.value)}
        />
      </Box>
      <FullWidthBtn handleAction={handleEdit} name={"Enregistrer"} />
    </Box>
  );
};

export default Onboarding;
