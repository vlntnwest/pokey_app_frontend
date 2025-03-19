import React, { useEffect, useState } from "react";
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
import ShopProvider from "../components/Context/ShopContext";

const Table = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const audience = process.env.REACT_APP_AUTH0_AUDIENCE;

  const types = ["bowl", "custom", "side", "dessert", "drink"];

  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isNewUser, setIsNewUser] = useState(null);

  useEffect(() => {
    const handleAuthentication = async () => {
      if (!isAuthenticated || !user?.email) return;

      try {
        const token = await getAccessTokenSilently({
          authorizationParams: {
            audience: audience,
            scope: "read:current_user read:users_app_metadata",
          },
        });

        const result = await dispatch(getUser(user.email, token));

        if (!result.success) {
          await createNewUser(token, user.email);
          setIsNewUser(true);
        }
      } catch (err) {
        console.error("Erreur lors de l'authentification", err);
      }
    };

    const createNewUser = async (token, email) => {
      const firstName = user.given_name;
      const lastName = user.family_name;

      try {
        await axios.post(
          `${process.env.REACT_APP_API_URL}api/users`,
          { email, firstName, lastName },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        await dispatch(getUser(email, token));
      } catch (err) {
        console.error("Erreur lors de la création de l'utilisateur", err);
      }
    };

    handleAuthentication();
  }, [isAuthenticated, user, dispatch, getAccessTokenSilently, audience]);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        await dispatch(getMeals());
      } catch (error) {
        setError(
          error.response
            ? error.response.data.error
            : "Error fetching meals data"
        );
      }
    };

    fetchMeals();
  }, [dispatch]);

  useEffect(() => {
    const fetchDetails = async () => {
      setIsLoading(true);
      try {
        await dispatch(getDetails());
      } catch (error) {
        setError(
          error.response
            ? error.response.data.error
            : "Error fetching details data"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [dispatch]);

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
    return <Onboarding setIsNewUser={setIsNewUser} />;
  }

  return (
    <ShopProvider>
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
          <Header auth />
          <Box component="main">
            <Popular />
            {types.map((type, index) => (
              <MealCategory type={type} key={index} />
            ))}
          </Box>
        </Box>
      </ShoppingCartProvider>
    </ShopProvider>
  );
};

export default Table;
