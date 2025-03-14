import React, { useEffect, useState } from "react";
import { CheckoutProvider } from "@stripe/react-stripe-js";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutContent from "./CheckoutContent";

const CheckoutForm = () => {
  const stripeKey = process.env.REACT_APP_STRIPE_PUBLIC_KEY;

  const stripe = loadStripe(stripeKey, {
    betas: ["custom_checkout_beta_5"],
  });

  const [clientSecret, setClientSecret] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const createCheckoutSession = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}api/checkout/create-checkout-session`,
          { body: JSON.stringify({ email: "valentinwestermeyer@gmail.com" }) }
        );

        setClientSecret(response.data.checkoutSessionClientSecret);
      } catch (error) {
        console.error("Erreur lors de la création de la session :", error);
        setError(`Erreur: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    createCheckoutSession();
  }, []);

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
        <CheckoutContent />
      </CheckoutProvider>
    );
  } else {
    return null;
  }
};

export default CheckoutForm;
