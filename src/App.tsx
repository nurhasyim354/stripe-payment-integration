import React from 'react';
import logo from './logo.svg';
import './App.css';

import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import CheckoutForm from './CheckoutForm';

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51NuVolLeW6H1NclicLQq5jNnVQWbXVlY1JW1DdHatIxz9Mh5vQ04WWSa9NbK8cKcpU3yTA9Rk75U4gfUtS6ubTA900PB4RcIXe');

function App() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};


export default App;
