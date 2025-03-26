import React, { useCallback, useEffect, useMemo, useState } from "react";
import { CheckoutProvider } from "@stripe/react-stripe-js";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutContent from "./CheckoutContent";
import { CircularProgress, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { validateForm } from "../../../utils/";
import FullWidthBtn from "../../Buttons/FullWidthBtn";
import { useSelector } from "react-redux";
import { formatPrice } from "../../Utils";
import { useGuest } from "../../Context/guestInfos";

const stripe = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY, {
  betas: ["custom_checkout_beta_5"],
});

const CheckoutForm = ({ handleSubmit, isGuest }) => {
  const [savedInfo, setSavedInfo] = useState(false);
  const [clientSecret, setClientSecret] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [cartData, setCartData] = useState([]);

  const { guestInfos, setGuestInfos } = useGuest();

  const [errors, setErrors] = useState({
    firstName: false,
    email: false,
    phone: false,
  });

  const [errorMessages, setErrorMessages] = useState({
    firstName: "",
    email: "",
    phone: "",
  });

  const user = useSelector((state) => state.userReducer);

  const items = useMemo(() => {
    return cartData.map((item) => {
      const itemPrice = (
        (formatPrice(item.price) +
          (item.extraProteinPrice ? parseFloat(item.extraProteinPrice) : 0)) *
        100
      ).toFixed(0);

      const el = {
        price_data: {
          currency: "eur",
          product_data: {
            name: item.name,
          },
          unit_amount: parseInt(itemPrice),
        },
        quantity: item.quantity,
      };
      return el;
    });
  }, [cartData]);

  const createCheckoutSession = useCallback(
    async (email) => {
      try {
        setLoading(true);
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}api/checkout/create-checkout-session`,
          { email, items }
        );
        setClientSecret(response.data.checkoutSessionClientSecret);
      } catch (error) {
        setError(`Erreur: ${error.message}`);
      } finally {
        setLoading(false);
      }
    },
    [items]
  );

  useEffect(() => {
    const storedCart = JSON.parse(sessionStorage.getItem("Cart")) || [];
    setCartData(storedCart);
  }, []);

  useEffect(() => {
    if (!isGuest && user?.email && items.length > 0 && !clientSecret) {
      createCheckoutSession(user.email);
    }
  }, [isGuest, user?.email, items, createCheckoutSession, clientSecret]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGuestInfos((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const checkGuest = async (e) => {
    e.preventDefault();

    if (!validateForm(guestInfos, setErrors, setErrorMessages)) {
      return;
    }
    try {
      await createCheckoutSession(isGuest ? guestInfos.email : user.email);
    } catch (error) {
      console.error("Erreur lors de la création de la session :", error);
      setError(`Erreur: ${error.message}`);
    } finally {
      setSavedInfo(true);
    }
  };

  if (isGuest && !savedInfo) {
    return (
      <Box
        component={"form"}
        onSubmit={(e) => checkGuest(e)}
        sx={{
          px: 4,
          py: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <TextField
          name="firstName"
          label="Prénom"
          required
          value={guestInfos.firstName}
          error={errors.firstName}
          helperText={errorMessages.firstName}
          sx={{ width: "100%", mb: 2 }}
          onChange={handleChange}
        />
        <TextField
          name="email"
          label="Email"
          required
          value={guestInfos.email}
          error={errors.email}
          helperText={errorMessages.email}
          sx={{ width: "100%", mb: 2 }}
          onChange={handleChange}
        />
        <TextField
          name="phone"
          label="Téléphone"
          required
          value={guestInfos.phone}
          error={errors.phone}
          helperText={errorMessages.phone}
          sx={{ width: "100%", mb: 2 }}
          onChange={handleChange}
        />
        <FullWidthBtn
          name={"Continuer"}
          handleAction={(e) => checkGuest(e)}
          isSubmitting={loading}
        />
      </Box>
    );
  }

  if (loading) {
    return (
      <Box
        style={{
          width: "100vw",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <div>Impossible de charger le formulaire de paiement: {error}</div>;
  }

  if (!clientSecret) {
    return <div>Impossible d'obtenir les informations de paiement.</div>;
  }

  if (clientSecret) {
    return (
      <CheckoutProvider stripe={stripe} options={{ clientSecret }}>
        <CheckoutContent handleSubmit={handleSubmit} />
      </CheckoutProvider>
    );
  } else {
    return null;
  }
};

export default CheckoutForm;
