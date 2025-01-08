import React from "react";
import { Link, useNavigate } from 'react-router-dom';

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayPalPayment = () => {
  const navigate = useNavigate();

  const initialOptions = { 
    clientId: import.meta.env.VITE_PAYPAL_CLIENTID,
    currency: "USD"
   }  
  
  const onCreateOrder = async () => {
    try 
    {
      const response = await fetch("http://localhost:3000/paypal/createOrder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })

      const data = await response.json();
      if (!data.orderId) 
      {
        throw new Error("Order ID not returned");
      }
      return data.orderId; // Return the PayPal Order ID

    } 
    catch (error) 
    {
      console.error("Error Creating Paypal Payment: ", error);
      throw error;
    }
  }

  const onApprove = async (data, action) => {
    try 
    {
      console.log("onApprove.data: ", data);

      const { orderID, payerID } = data;
      
      const response = await fetch(`http://localhost:3000/paypal/capturePayment/${orderID}`, {
        method: "POST", 
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();
            
      if (result.status === "COMPLETED") 
      {         
        navigate("/success-payment"); // Redirect to success page
      }
      else 
      { 
        navigate("/cancel-payment")
        throw new Error("Payment not completed"); 
      }  
        
    } 
    catch (error) 
    {
      console.error("Paypal couldn't verify payment", error);
      navigate("/cancel-payment");
      throw new Error("Paypal couldn't approve payment:", error);
    }
  }
  
  const onError = async (err) => {
    console.error("Paypal encountered an error", err);
    navigate("/cancel-payment");
  }

  return (
    <div>
      <PayPalScriptProvider options={initialOptions}>
        {/* <h6> Choose a payment method </h6> */}
        <PayPalButtons 
          style={{ shape:"pill", layout:"vertical", color:"blue" }}
          createOrder={onCreateOrder}
          onApprove={onApprove}
          onError={onError}
          // fundingSource="paypal"
        />
      </PayPalScriptProvider> 
    </div>
  )
}

export default PayPalPayment

