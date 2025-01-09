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
          // createOrder={onCreateOrder}
          onApprove={onApprove}
          onError={onError}
        />
      </PayPalScriptProvider>
    </div>
  );
};

export default PayPalPayment;
