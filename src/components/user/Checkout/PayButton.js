import React, { useState } from "react";
import { useCheckout } from "@stripe/react-stripe-js";
import FullWidthBtn from "../../Buttons/FullWidthBtn";

const PayButton = ({ handleSubmit }) => {
  const { confirm } = useCheckout();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleClick = () => {
    setLoading(true);

    confirm({
      email: "valentinwestermeyer@gmail.com",
      redirect: "if_required",
    })
      .then((result) => {
        if (result.type === "error") {
          setError(result.error);
        }
      })
      .then(() => {
        handleSubmit();
        setLoading(false);
      });
  };

  return (
    <div>
      <FullWidthBtn
        handleAction={handleClick}
        name={"Payer"}
        disabled={loading}
        isSubmitting={loading}
      />
      {error && <div>{error.message}</div>}
    </div>
  );
};

export default PayButton;
