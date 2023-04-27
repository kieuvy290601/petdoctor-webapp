require("dotenv").config();
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to PETOPIA website.");
});

// const array = [];
const calculateOrderAmount = (items, shippingFee) => {
  // Calculate the total amount on the server-side
  const totalAmount =
    items.reduce((total, item) => total + item.prdPrice * item.quantity, 0) +
    shippingFee;

  const orderAmount = totalAmount * 100;

  //   // Thêm phí vận chuyển vào tổng giá trị đơn hàng
  //   const orderAmount = totalAmount + shippingFee;
  return orderAmount;
};

app.post("/create-payment-intent", async (req, res) => {
  const { items, shipping, description, shippingFee } = req.body;

  // Calculate the total amount on the server-side
  const totalAmount =
    items.reduce((total, item) => total + item.prdPrice * item.quantity, 0) +
    shippingFee;
  
  const orderAmount = totalAmount * 100;

  
  // Create a PaymentIntent with the order amount and currency

  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items, shippingFee),
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
    description,
    shipping: {
      address: {
        line1: shipping.line1,
        line2: shipping.line2,
        city: shipping.city,
        state: shipping.state,
      },
      name: shipping.name,
      phone: shipping.phone,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
    orderAmount,
  });
});

const PORT = process.env.PORT || 4242;

app.listen(PORT, () => console.log(`Node server listening on port ${PORT}`));
