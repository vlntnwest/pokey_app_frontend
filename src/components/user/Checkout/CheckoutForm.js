import React, { useEffect, useState } from "react";
import { CheckoutProvider } from "@stripe/react-stripe-js";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutContent from "./CheckoutContent";
import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { validateForm } from "../../../utils";
import FullWidthBtn from "../../Buttons/FullWidthBtn";
import { useSelector } from "react-redux";

const CheckoutForm = ({ handleSubmit, isGuest }) => {
  const [savedInfo, setSavedInfo] = useState(false);
  const stripeKey = process.env.REACT_APP_STRIPE_PUBLIC_KEY;
  const stripe = loadStripe(stripeKey, {
    betas: ["custom_checkout_beta_5"],
  });
  const [clientSecret, setClientSecret] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    phone: "",
  });

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
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!isGuest) createCheckoutSession(user.email);
  }, [isGuest, user]);

  const createCheckoutSession = async (email) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}api/checkout/create-checkout-session`,
        {
          email: email,
        }
      );

      setClientSecret(response.data.checkoutSessionClientSecret);
    } catch (error) {
      console.error("Erreur lors de la création de la session :", error);
      setError(`Erreur: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const checkGuest = async (e) => {
    e.preventDefault();

    if (!validateForm(formData, setErrors, setErrorMessages)) {
      return;
    }
    try {
      setEmail(formData.email);
      await createCheckoutSession(isGuest ? formData.email : user.email);
    } catch (error) {
      console.error("Erreur lors de la création de la session :", error);
      setError(`Erreur: ${error.message}`);
    } finally {
      setLoading(false);
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
        }}
      >
        <TextField
          name="firstName"
          label="Prénom"
          required
          value={formData.firstName}
          error={errors.firstName}
          helperText={errorMessages.firstName}
          sx={{ width: "100%", mb: 2 }}
          onChange={handleChange}
        />
        <TextField
          name="email"
          label="Email"
          required
          value={formData.email}
          error={errors.email}
          helperText={errorMessages.email}
          sx={{ width: "100%", mb: 2 }}
          onChange={handleChange}
        />
        <TextField
          name="phone"
          label="Téléphone"
          required
          value={formData.phone}
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
    return <div>Chargement du formulaire de paiement...</div>;
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
        <CheckoutContent handleSubmit={handleSubmit} email={email} />
      </CheckoutProvider>
    );
  } else {
    return null;
  }
};

export default CheckoutForm;
