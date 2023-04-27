import React from "react";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <section>
      <div className="text-center">
        <h1>Thank you for your order!</h1>
        <p className="mt-1">
          Your order has been successfully processed and will be shipped to you
          soon.
        </p>{" "}
        <Link to={"/orderhistory"}>
          <button
            style={{
              padding: "7px 12px",
              borderRadius: 10,
              backgroundColor: "var(--primary-color)",
              color: "white",
              marginTop: 20,
            }}
          >
            View order status
          </button>
        </Link>
      </div>
    </section>
  );
};

export default PaymentSuccess;
