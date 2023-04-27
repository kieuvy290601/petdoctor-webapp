import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CheckoutSummary from "./CheckoutSummary";
import { useDispatch } from "react-redux";
import { cartActions } from "../../redux/slices/cartSlice";
import spinner from "../../assets/images/spinner.gif"


const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }
  }, [stripe]);

  const storeOrder = () => {
    console.log("Order store successful");
    dispatch(cartActions.clearCart);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const confirmPayment = await stripe
      .confirmPayment({
        elements,
        confirmParams: {
          // Make sure to change this to your payment completion page
          return_url: "http://localhost:3000/payment-success",
        },
        redirect_url: "if_required",
      })
      .then((result) => {
        if (result.error) {
          toast.error(result.error.message);
          setMessage(result.error.message);
          return;
        }
        if (result.paymentIntent) {
          if (result.paymentIntent.status === "succeeded") {
            setIsLoading(false);
            toast.success("Payment successfully");
            storeOrder();
          }
        }
      });

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <div className="container-xl mb-5">
      <div className="row">
        <form onSubmit={handleSubmit}>
          <div className="d-flex">
            <div className="col-xl-6 mx-2">
              <CheckoutSummary />
            </div>
            <div className="col-xl-6 mx-2">
              <div className="card">
                <div className="card-header" style={{ fontSize: 20 }}>
                  Stripe Payment
                </div>
                <PaymentElement
                  className="mt-3"
                  id="payment-element"
                  options={paymentElementOptions}
                />
                <button
                  style={{
                    backgroundColor: "var(--primary-color)",
                    padding: 10,
                    border: "none",
                    borderRadius: 10,
                    color: "white",
                    marginTop: 10,
                  }}
                  disabled={isLoading || !stripe || !elements}
                  id="submit"
                >
                  <span id="button-text">
                    {isLoading ? (
                      <img
                        src={spinner}
                        alt="Loading..."
                        style={{ width: "20px" }}
                      />
                    ) : (
                      "Proceed to checkout"
                    )}
                  </span>
                </button>
                {/* Show any error or success messages */}
                {message && <div id="payment-message">{message}</div>}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
