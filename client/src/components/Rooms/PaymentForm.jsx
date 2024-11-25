import React, { useState } from 'react';
import { TailSpin } from "react-loader-spinner";
import { FaCreditCard } from "react-icons/fa";
import { FaCheckCircle } from 'react-icons/fa';

const PaymentMethod = ({ paymentInfo, setCheckoutInfo, handlePaymentProcessed }) => 
{
    const [isProcessing, setProcessing] = useState(false);
    const [paymentSuccessful , setPaymentSuccessful ] = useState(false);

    const [name, setName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [securityCode, setSecurityCode] = useState('');
    const [amount, setAmount] = useState(0);
    const [errors, setErrors] = useState({});

    const namePattern = /^[a-zA-Z\s']+$/
    const cardNumberPattern = `/^\d{4} \d{4} \d{4} \d{4}$/`
    const monthPattern = /^(0[1-9]|1[0-2])$/
    const yearPattern = /^\d{4}$/
    // const securityCodePattern = /^\d{3,4}$/

    const handleCheckout = (e) => {
        e.preventDefault();
        const errors = {};

        if (!namePattern) {
        errors.name = 'Invalid name on card';
        }

        if (!cardNumberPattern) {
        errors.cardNumber = 'Invalid card number';
        }

        if (!monthPattern || !yearPattern) {
        errors.expirationDate = 'Invalid expiration date';
        }

        // if (!securityCodePattern) {
        // errors.securityCode = 'Invalid security code';
        // }

        setErrors(errors);

        if (Object.keys(errors).length === 0) 
        {
            // If all validations pass, proceed with checkout
            console.log('Checkout...', paymentInfo);
            setProcessing(true);
            setTimeout(() => 
              {
                setPaymentSuccessful(true);          
              
              }, 10 * 1000);
        }
    };

    return (
        <form className="pay-method" >
          <strong>Payment Method</strong>
          <select>
              <option value="card">Card</option>
              <option value='paypal'>Paypal</option>
          </select>

          <input type='number' value={amount} placeholder='Amount' min={500} 
            onChange={(e)=> setAmount(e.target.value)}/>
      

          <h6>Debit/Credit card number</h6>
          <input
              type="tel"
              id="cardnumber"
              value={cardNumber}
              pattern="\d{4} \d{4} \d{4} \d{4}"
              maxLength={19}
              onChange={(e) => {
                  const cardNumber = e.target.value.replace(/\s+/g, '').replace(/(\d{4})/g, '$1 ').trim();
                  setCardNumber(cardNumber);
              }}
              placeholder="0000 0000 0000 0000"
              required
          />
          {errors.cardNumber && <small style={{ color: 'red' }}>{errors.cardNumber}</small>}
          {/* <br /> */}

        <h6>Expiration date</h6>
        <select id="exp-mon" value={month} pattern={monthPattern}
            onChange={(e) => setMonth(e.target.value)}>
            <option value="">Month</option>
            <option value="1">01</option>
            <option value="2">02</option>
        </select>
        <select id="exp-yr" value={year} pattern={yearPattern}
            onChange={(e) => setYear(e.target.value)}>
            <option value="Year">Year</option>
            <option value="1">01</option>
            <option value="2">02</option>
        </select>
        {errors.expirationDate && <small style={{ color: 'red' }}>{errors.expirationDate}</small>}
        {/* <br /> */}

        <h6>Security code</h6>
        <input
            id="sec-code"
            value={securityCode}
            // pattern={securityCodePattern}
            maxLength={4}
            onChange={(e) => setSecurityCode(e.target.value)}
            placeholder="cvc"
        />
        {errors.securityCode && <small style={{ color: 'red' }}>{errors.securityCode}</small>}
        
        <br />
        <button onClick={handleCheckout}>Checkout</button>

        {
            isProcessing &&
            <div className='process_payment'>   
                <div className='loader'>
                {
                    paymentSuccessful ? (
                        <>
                            <h2>Payment Successful</h2>
                            <FaCheckCircle size={40} color="#00BFFF" style={{ position: 'absolute', top: '27%', left: '48%' }} />
                        
                            <button onClick={()=>{
                              setProcessing(false);
                              handlePaymentProcessed(true);
                            }}>Continue</button>
                        </>
                    ) : (
                        <>
                            Processing Your Payment...<br/>
                            Please wait for a few seconds<br/>
                            <div style={{ position: 'absolute', top: '20%', left: '43%' }} ><TailSpin type="TailSpin" color="#00BFFF" height={128} width={128} /></div>
                            <FaCreditCard size={40} color="#fff" style={{ position: 'absolute', top: '27%', left: '48%' }} />
                        </>
                    )
                }
                </div>        
                
            
            </div> 
        }
       
        </form>
  );
};

export default PaymentMethod;