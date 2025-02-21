import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/user/Header";
import { useDispatch } from "react-redux";
import { getDetails } from "../actions/details.action";
import { Alert, Box, CircularProgress, Container } from "@mui/material";
import Popular from "../components/user/Popular";
import MealCategory from "../components/user/MealCategory";
import { getMeals } from "../actions/meal.action";
import ShoppingCartProvider from "../components/Context/ShoppingCartContext";
import { useAuth0 } from "@auth0/auth0-react";
import { getUser } from "../actions/users.action";
import Onboarding from "../components/user/Onboarding/Onboarding";
import axios from "axios";

const Table = () => {
  const dispatch = useDispatch();
  const { tableNumber } = useParams();
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const audience = process.env.REACT_APP_AUTH0_AUDIENCE;

  const types = ["bowl", "custom", "side", "dessert", "drink"];

  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isNewUser, setIsNewUser] = useState(null);

  useEffect(() => {
    const fetchEverything = async () => {
      setIsLoading(true);
      if (isAuthenticated && user?.email) {
        try {
          const token = await getAccessTokenSilently({
            authorizationParams: {
              audience: audience,
              scope: "read:current_user read:users_app_metadata",
            },
          });
          const result = await dispatch(getUser(user.email, token));

          if (!result.success) {
            setIsNewUser(true);
            const data = {
              email: user.email,
            };
            try {
              axios.post(`${process.env.REACT_APP_API_URL}api/users`, data, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
            } catch (err) {
              console.error("Erreur lors de la création de l'utilisateur", err);
            }
          }
        } catch (err) {
          console.error("Erreur lors de la récupération du token", err);
        }
      }

      try {
        await dispatch(getMeals());
        await dispatch(getDetails());
      } catch (error) {
        setError(
          error.response
            ? error.response.data.error
            : "Error fetching tables data"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchEverything();
  }, [
    isAuthenticated,
    user,
    dispatch,
    getAccessTokenSilently,
    audience,
    tableNumber,
  ]);

  if (isLoading) {
    return (
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100vh",
          justifyContent: "center",
        }}
      >
        <img
          src="https://g10afdaataaj4tkl.public.blob.vercel-storage.com/img/1Fichier-21.svg"
          alt="Pokey bar logo"
          style={{ width: "100%" }}
        />
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100vh",
          justifyContent: "center",
        }}
      >
        <img
          src="https://g10afdaataaj4tkl.public.blob.vercel-storage.com/img/1Fichier-21.svg"
          alt="Pokey Bar logo"
          style={{ width: "100%" }}
        />
        <Alert severity="error" sx={{ width: "100%" }}>
          Error: {error}
        </Alert>
      </Container>
    );
  }

  if (isNewUser === true && isAuthenticated) {
    return <Onboarding />;
  }

  return (
    <ShoppingCartProvider>
      <Box
        style={{
          "&::WebkitScrollbar": {
            display: "none",
          },
          MsOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        <Header />
        <Box component="main">
          <Popular />
          {types.map((type, index) => (
            <MealCategory type={type} key={index} />
          ))}
        </Box>
      </Box>
    </ShoppingCartProvider>
  );
};

export default Table;
