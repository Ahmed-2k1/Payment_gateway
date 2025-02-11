require("dotenv").config(); 
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("sk_test_51QpXMdQqwMek9dznmirHyuSQXYGRAdjJipThQKLlE2Pb7jfutquQlUwXjBSqYDiZG9wFEPHRqfeF6g0vzKRlouX200JRC7Hxqu");
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

app.get("/", (req, res) => {
    res.send("It's working absolutely fine")
});

app.post("/create-checkout-session", async (req, res) => {
  const { product } = req.body;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.productname,
          },
          unit_amount: product.price * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
  });

  res.json({ id: session.id });
});

app.listen(8282, () => console.log("listening at port 8282"))