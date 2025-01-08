import React, { useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayPalPayment = ({checkoutInfo, setCheckoutStatus}) => {

  const [accessToken, setAccessToken] = useState(null);
  const { amount, uid, room } = checkoutInfo;

  useEffect(() => {
    // Fetch the access token from your server
    async function fetchAccessToken() 
    {
      try 
      {
        const response = await fetch('http://localhost:3000/paypal/getAccessToken');
        const data = await response.json();

        if (data.accessToken) 
        {
          setAccessToken(data.accessToken);
        } 
        else { console.error('Failed to get access token'); }
      } 
      catch (error) {
        console.error('Error fetching access token:', error);
      }
    }

    fetchAccessToken();
  }, []);

  // PayPal ScriptProvider options
  const initialOptions = {
    clientId: import.meta.env.VITE_PAYPAL_CLIENTID, // PayPal Client ID from Vite environment variables
    currency: "USD",
  };

  // Create PayPal order when the user clicks the PayPal button
  const onCreateOrder = async (data, actions) => {
    try {
      if (!accessToken) {
        throw new Error("Access token is missing");
      }

      // Create PayPal order using the client-side API
      const response = await fetch("https://api.sandbox.paypal.com/v2/checkout/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`, // Use the access token here
        },
        body: JSON.stringify({
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: {
                currency_code: "USD",
                value: amount.toString(), // The amount for the booking
              },
              description: `Booking for room ${room} by user ${uid}`,
            },
          ],
          application_context: {
            brand_name: "Your Hotel",
            return_url: "http://localhost:3000/payment-success", // PayPal return URL
            cancel_url: "http://localhost:3000/payment-cancel", // PayPal cancel URL
          },
        }),
      });

      const order = await response.json();
      if (order.id) {
        return order.id; // Return the PayPal order ID to PayPal button
      } else {
        throw new Error("Error creating PayPal order");
      }
    } catch (error) {
      console.error("Error creating PayPal order:", error);
      throw new Error("Failed to create PayPal order");
    }
  };

  // Callback when the user approves the payment
  const onApprove = async (data, actions) => {
    try 
    {
      console.log("onApprove data:", data);
      const orderID = data.orderID;

      // Capture the order
      const result = await actions.order.capture();
      console.log("Capture Result: ", result);

      if (result.status === "COMPLETED") 
      {
        console.log("Payment successful!");
        setCheckoutStatus("Payment_Successful");
      } 
      else 
      {
        console.log("Failure Processing Payment!!!");
        setCheckoutStatus("Payment_Failure")
      }
    } 
    catch (error) 
    {
      console.error("Error capturing payment: ", error);
      setCheckoutStatus("Error_Capturing_Payment")
    }
  };

  // Callback when there's an error in the process
  const onError = (err) => {
    console.error("Error occurred during payment process", err);
    alert("An error occurred during the payment process");
  };

  // Loading UI until access token is available
  if (!accessToken) {
    return <div>Loading PayPal...</div>;
  }

  return (
    <div>
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons 
          style={{ shape: "pill", layout: "vertical", color: "blue" }}
          onApprove={onApprove}
          onError={onError}
        />
      </PayPalScriptProvider>
    </div>
  );
};

export default PayPalPayment;
