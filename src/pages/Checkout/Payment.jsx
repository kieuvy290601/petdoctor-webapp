import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import PaymentForm from "../../components/Payment/PaymentForm";
import { selectEmail } from "../../redux/slices/authSlice";
import { selectShippingAddress } from "../../redux/slices/checkoutSlice";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Payment = () => {
  const [message, setMessage] = useState("Starting the checkout process...");
  const [clientSecret, setClientSecret] = useState("");

  const cartItems = useSelector((state) => state.cart.cartItems);

  const emailAddress = useSelector(selectEmail);
  const shippingAddress = useSelector(selectShippingAddress);
  const shippingFee = useSelector((state) => state.cart.shippingFee);

  const description = `PETOPIA payment: customerEmail: ${emailAddress}`;

  useEffect(() => {
    fetch("http://localhost:4242/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: cartItems,
        userEmail: emailAddress,
        shipping: shippingAddress,
        description,
        amount: parseInt(shippingFee),
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then((json) => Promise.reject(json));
      })
      .then((data) => setClientSecret(data.clientSecret))
      .catch((error) => {
        setMessage("Failed to starting the checkout process");
        toast.error(error.message);
      });
  }, [shippingAddress, cartItems, description, emailAddress, shippingFee]);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <>
      <section>
        <div className="container">{!clientSecret && <h3>{message}</h3>}</div>
      </section>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <PaymentForm />
        </Elements>
      )}
    </>
  );
};

export default Payment;
