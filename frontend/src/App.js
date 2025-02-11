import React, {useState} from 'react';
import './App.css'; 
import process from 'process';

import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(process.env.REACT_APP_KEY);

function App() {
  const [product] = useState({
    productname: "React from Meta",
    price: 10,
    productBy: "Meta",
  });

  const makePayment = async () => {
    const stripe = await stripePromise;

    const response = await fetch("http://localhost:8282/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ product }),
    });

    const session = await response.json();
    stripe.redirectToCheckout({ sessionId: session.id });
  };

  return (
    <div className="App">
      <button className="btn-large blue" onClick={makePayment}>
        Buy React at just ${product.price}
      </button>
    </div>
  );
}

export default App;

