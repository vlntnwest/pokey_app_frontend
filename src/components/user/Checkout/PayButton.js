import React, { useState } from "react";
import { useCheckout } from "@stripe/react-stripe-js";
import FullWidthBtn from "../../Buttons/FullWidthBtn";

const PayButton = ({ handleSubmit, email }) => {
  const { confirm } = useCheckout();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);

    try {
      const result = await confirm({
        redirect: "if_required",
      });

      if (result.type !== "error") {
        handleSubmit();
      }
    } catch (error) {
      console.error("Une erreur s'est produite :", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <FullWidthBtn
        handleAction={handleClick}
        name={"Payer"}
        isSubmitting={loading}
      />
    </div>
  );
};

export default PayButton;
