import React from "react";
import { Elements, StripeProvider } from "react-stripe-elements";
import { apiKey } from "./Stripe";

const PaymentTerminal = () => {
  return (
    <div className="Modal">
      <StripeProvider apiKey={apiKey}>
        <Elements>
          <CheckoutForm />
        </Elements>
      </StripeProvider>
    </div>
  );
};

export default PaymentTerminal;
