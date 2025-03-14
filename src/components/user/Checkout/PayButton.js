import React, { useState } from "react";
import { useCheckout } from "@stripe/react-stripe-js";

const PayButton = () => {
  const { confirm } = useCheckout();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleClick = () => {
    setLoading(true);

    confirm({
      email: "valentinwestermeyer@gmail.com",
    }).then((result) => {
      if (result.type === "error") {
        setError(result.error);
      }
      setLoading(false);
    });
  };

  return (
    <div>
      <button disabled={loading} onClick={handleClick}>
        Payer
      </button>
      {error && <div>{error.message}</div>}
    </div>
  );
};

export default PayButton;
