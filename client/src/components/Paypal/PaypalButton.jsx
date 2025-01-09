import React, { useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayPalPayment = ({ checkoutInfo, setCheckoutStatus, setPaymentDetails }) => {
  const [accessToken, setAccessToken] = useState(null);
  const { amount, uid, room } = checkoutInfo;

  // Fetch the PayPal access token when the component mounts
  useEffect(() => {
    async function fetchAccessToken() {
      try {
        const response = await fetch('http://localhost:3000/paypal/getAccessToken');
        const data = await response.json();

        if (data.accessToken) {
          setAccessToken(data.accessToken);
        } else {
          console.error('Failed to get access token');
        }
      } catch (error) {
        console.error('Error fetching access token:', error);
      }
    }

    fetchAccessToken();
  }, []);

  // PayPal ScriptProvider options
  const initialOptions = {
    clientId: import.meta.env.VITE_PAYPAL_CLIENTID, // PayPal Client ID from environment variables
    currency: "USD",
  };

  // Create PayPal order using the access token and amount
  const onCreateOrder = async (data, actions) => {
    try {
      if (!accessToken) {
        throw new Error("Access token is missing");
      }

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
                value: amount.toString(),
              },
              description: `Booking for room ${room} by user ${uid}`,
            },
          ],
          application_context: {
            brand_name: "RestLeBnB",
            return_url: "http://localhost:3000/payment-success", // PayPal return URL
            cancel_url: "http://localhost:3000/payment-cancel", // PayPal cancel URL
          },
        }),
      });

      const order = await response.json();
      console.log("Order created: ", order);

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
    try {
      const result = await actions.order.capture(); // Capture the payment
      console.log("Capture Result: ", result);

      if (result.status === "COMPLETED") 
      {
        console.log("Payment successful!");
        setCheckoutStatus("Payment_Successful");

       
        const paymentDetails = result.purchase_units?.[0]?.payments?.captures?.[0];

        // If paymentDetails exist, log the relevant information
        if (paymentDetails) 
        {
          console.log("Payment Details: ", paymentDetails);
        
          // Access and log the transaction fee (if available)
          const transactionFee = paymentDetails.transaction_fee?.value || "No fee information";
          console.log("Transaction Fee: ", transactionFee);
        
          // Access and log the capture ID
          const captureID = paymentDetails.id;
          console.log("Capture ID: ", captureID);
        
          // Access and log the amount
          const amount = paymentDetails.amount?.value || "No amount information";
          console.log("Amount: ", amount);
        } 
        else { console.error("No payment details found in the capture result"); }
      } 
      else 
      {
        console.log("Failure Processing Payment!!!");
        setCheckoutStatus("Payment_Failure");
      }
    } catch (error) {
      console.error("Error capturing payment: ", error);
      setCheckoutStatus("Error_Capturing_Payment");
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
          createOrder={onCreateOrder}  // Create the order using the access token
          onApprove={onApprove}         // Capture the payment after approval
          onError={onError}            // Handle errors
        />
      </PayPalScriptProvider>
    </div>
  );
};

export default PayPalPayment;
