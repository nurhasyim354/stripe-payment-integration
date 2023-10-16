
import {useStripe, useElements, CardElement, CardCvcElement, CardExpiryElement, CardNumberElement} from '@stripe/react-stripe-js';
import './Styles.css';

import useResponsiveFontSize from "./useResponsiveFontSize";
import { useMemo } from 'react';

const useOptions = () => {
    const fontSize = useResponsiveFontSize();
    const options = useMemo(
      () => ({
        style: {
          base: {
            fontSize,
            color: "#424770",
            letterSpacing: "0.025em",
            fontFamily: "Source Code Pro, monospace",
            "::placeholder": {
              color: "#aab7c4"
            }
          },
          invalid: {
            color: "#9e2146"
          }
        }
      }),
      [fontSize]
    );
  
    return options;
  };

export default function  CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();

  const handleSubmit = async (event:any) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const response = await fetch(
        'http://localhost:3002/bill/v1/orders/6A99CFD3-E2BF-4CA5-967E-552AE8CD6B82/pay',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }
        }
      ).then((r) => r.json());

      console.log({response});

    const result = await stripe.confirmCardPayment(response.data.paymentIntent.client_secret, {
      payment_method: {
        card: elements.getElement(CardNumberElement)!,
        billing_details: {
          name: 'Nur Test',
        },
      }
    });

    console.log({result});
    if (result.error) {
      // Show error to your customer (for example, insufficient funds)
      console.log(result.error.message);
    } else {

      // The payment has been processed!
      if (result.paymentIntent.status === 'succeeded') {
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Card number
        <CardNumberElement
          options={options}
          onReady={() => {
            console.log("CardNumberElement [ready]");
          }}
          onChange={event => {
            console.log("CardNumberElement [change]", event);
          }}
          onBlur={() => {
            console.log("CardNumberElement [blur]");
          }}
          onFocus={() => {
            console.log("CardNumberElement [focus]");
          }}
        />
      </label>
      <label>
        Expiration date
        <CardExpiryElement
          options={options}
          onReady={() => {
            console.log("CardNumberElement [ready]");
          }}
          onChange={event => {
            console.log("CardNumberElement [change]", event);
          }}
          onBlur={() => {
            console.log("CardNumberElement [blur]");
          }}
          onFocus={() => {
            console.log("CardNumberElement [focus]");
          }}
        />
      </label>
      <label>
        CVC
        <CardCvcElement
          options={options}
          onReady={() => {
            console.log("CardNumberElement [ready]");
          }}
          onChange={event => {
            console.log("CardNumberElement [change]", event);
          }}
          onBlur={() => {
            console.log("CardNumberElement [blur]");
          }}
          onFocus={() => {
            console.log("CardNumberElement [focus]");
          }}
        />
      </label>
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
}