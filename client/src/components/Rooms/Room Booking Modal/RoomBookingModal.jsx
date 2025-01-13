import './RoomBookingModal.css'

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
// import PayPalPayment from '../../Paypal/PayPalPayment';
import PayPalPayment from '../../Paypal/PaypalButton';
import { createBooking } from '../../../redux/bookingSlice';
import { updateRoomAfterBooking } from '../../../redux/roomsSlice';


const RoomBookingModal = ({room, setShowModal}) => 
{
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.auth.user);
    const userData = useSelector((state) => state.auth.userData);     
    
    const [roomName, setRoomName] = useState(room.room_name);
    const [roomType, setRoomType] = useState('');
    const [roomDescription, setRoomDescription] = useState(room.room_description);
    const [stayPerNight, setStayPerNight] = useState(room.avail_night);

    const [checkInDate, setCheckInDate] = useState(`${new Date().toISOString().split('T')[0]}`);
    const [checkOutDate, setCheckOutDate] = useState('');    

    const [guests, setGuests] = useState(room.capacity);
    const [adults, setAdults] = useState(room.capacity);
    const [children, setChildren] = useState(0);

    const [phone, setPhoneNumber] = useState();
    

    const [checkoutInfo, setCheckoutInfo] = useState({
         uid: user.uid, 
         email: user.email,
         room: room.id, 
         roomName,
         amount: room.price 
    });
    const [checkoutStatus, setCheckoutStatus] = useState(null);
    const [paymentDetails, setPaymentDetails] =useState({})

    const handleAdultsChange = (event) => {
        setAdults(event.target.value);
        setGuests(parseInt(event.target.value) + parseInt(children));
    };
    
    const handleChildrenChange = (event) => {
        setChildren(event.target.value);
        setGuests(parseInt(adults) + parseInt(event.target.value));
      };

    const handleRoomTypeChange = (event) => {
        setRoomType(event.target.value);
    };


    const handleSubmit = () => {             
        console.log("onPayment Success: ", checkoutInfo, " | ", paymentDetails);
        const bookingDetails = {
            roomType,
            checkInDate,
            checkOutDate,
            guests,
            adults,
            children,
            roomDescription,
            amount: room.price,
            roomId: room.id,
            roomName: room.room_name,
            userId: user.uid,
            paymentDetails: paymentDetails,
            bookingStatus: paymentDetails.status ? "Paid" : "Completed", // This can be updated based on the payment status
          };
      
          // Dispatch the createBooking action to save the booking in Firestore
          dispatch(createBooking({ bookingDetails }));
          dispatch(updateRoomAfterBooking({
            roomId: room.id,
            bookingDetails: {
              checkInDate: checkInDate,
              checkOutDate: checkOutDate, 
              numberOfNights: room.avail_night,  // Example number of nights
            }
          }));
        
        setShowModal(false);
        navigate("/dashboard");
    };

    // Watch for checkout status changes
    useEffect(() => {
        if (checkoutStatus !== null) {
            if (checkoutStatus === "Payment_Successful") 
            {
                handleSubmit();  // Proceed with booking submission
            } 
            else { alert("Error processing payment! Please try again."); }
        }
    }, [checkoutStatus]);
   

    console.log("checkoutStatus: ", checkoutStatus)

  return (
   
    <div className='booking-modal'>
         { console.log('room: ', room)    }         
         { console.log('roombooking.u?: ', userData) } 
         
        
        <div className='room-details-block'>
            
            <h2>{ room.room_name }</h2>
            <div className="amenities">                        
                <ul style={{flexDirection:'row'}}>                        
                    <li>💻<i className="fa fa-wifi"/></li>                            
                    <li>📶<i className="fa fa-wifi"/></li>                            
                    <li>🧺<i className="fa fa-hands-wash"/></li>  
                    <li>🛎<i className="fa fa-concierge-bell"/></li>                                        
                </ul>                        
            </div>
             
        </div>       
        

        <div className="grid-content"> 
            <div className="grid-item item1">                  

                <div className="room-showcase">
                    <div className='checkin-rectangle'>
                        <div className="check-compare">
                            <label>
                                {/* Room Type: */}
                                <select value={roomType} onChange={handleRoomTypeChange}>
                                <option value="">Room Type</option>
                                <option value="single">Single</option>
                                <option value="double">Double</option>
                                <option value="suite">Suite</option>
                                </select>
                            </label>
                        </div>

                        <div className="check-compare">                       
                            <input type="date" min={new Date().toISOString().split('T')[0]}
                                value={checkInDate}
                                onChange={(event) => { setCheckInDate(event.target.value) }} 
                            />
                        </div>

                        <div className="check-compare">                       
                            <input type="date" min={checkInDate}
                                onChange={(event) => { setCheckOutDate(event.target.value) }} 
                            />
                        </div>              

                        <div className="check-compare">
                            <select onChange={handleAdultsChange}>
                                <option value="1">ADULTS (1)</option>
                                <option value="2">ADULTS (2)</option>
                                <option value="3">ADULTS (3)</option>
                                <option value="4">ADULTS (4)</option>
                            </select>                            
                        </div>

                        <div className="check-compare">
                            <select onChange={handleChildrenChange}>
                                <option value="0">KIDS (0)</option>
                                <option value="1">KIDS (1)</option>
                                <option value="2">KIDS (2)</option>
                                <option value="3">KIDS (3)</option>
                                <option value="4">KIDS (4)</option>
                            </select>                        
                        </div>  

                        <div className="check-compare">
                            <strong> Guests[{guests}]</strong>                       
                        </div>            
                    </div>  

                    <div className='room-details'>
                        <label> • 🛏 {room.room_description} • 👨‍👩‍👧‍👧 {room.capacity} guests</label>
                        <label> Availablity: {room.avail_night}-nights stay 
                            <small> 
                                • <strong>Check-in</strong> [{room.avail_check_in}] 
                                • <strong>Check-out</strong> [{room.avail_check_out}]
                            </small>
                        </label>
                        {/* <label>Availablity:</label> */}                
                    </div> 

                    <div className="images-container">
                        <div className="preview-img">
                            <img src={ room.image[0] }/>
                        </div>

                        <div className="v-thumbnails">
                            <img src={ room.image[0] }/>
                            <img src={ room.image[1] }/>
                            <img src={ room.image[2] }/>                                
                        </div>
                        
                    </div> 
                    
                    <select>
                        <option value="">Bedding Request(optional)</option>   
                        <option value="">1 Double Bed</option>   
                        <option value="">2 Twin Beds</option>   
                    </select>
                    <br/><textarea placeholder='special requests'/>  
                </div>                    
                
            </div>

            <div className="grid-item item2">                   
                
                <div className='who-checking'>
                    <strong>Who's checking in?</strong><br/>
                    <div>
                        {console.log(user)}
                        <input type='text' id='fname' 
                            value={userData.firstname}
                            placeholder={ userData !== null ? `eg.(${userData.firstname})`: 'Firstname' }
                        /> 
                        <input type='text' id='lname' 
                            value={userData.lastname}
                            placeholder={ userData !== null ? `eg.(${userData.lastname})` : 'Lastname' }
                        /> 
                    </div>
                    
                    <input text='email' id='email' value={user.email} placeholder={user !== null ? `eg.(${user.email})` : 'Email address'} /><br/>
                    
                    <div>
                        <select name="" id="code">                                    
                            <option value="+27">(+27)</option>
                        </select><input type='text' placeholder='00 000 0000' maxLength={9}
                            onChange={(e)=> setPhoneNumber(e.target.value)}/>
                    </div>

                    <div className="check-alerts">
                        <input type="checkbox" />
                        <small> 
                            Receive text alerts for this trip.                                        
                        </small>
                    </div>
                    <small> Message and data rates may apply.</small>
                    <button onClick={()=>{setShowModal(false)}}>Cancel</button>
                </div>  

            </div>

            <div className="grid-item item3">
                <div className='pricing-info'>
                    <strong>Pricing Information</strong>
                    <hr/>
                    <label> 
                        ${room.price } room x {room.avail_night} nights
                        {/* <strong>R{room.price * room.avail_night}</strong> */}
                    </label>

                    <label> Taxes ${room.price/4}</label>
                    <hr/>
                    <p>Total <b>${room.price }</b></p> 
                    <h6>Deposits collected by property</h6>
                    
                    <small>Your first payment: <b>R1000</b></small>
                    {/* <br/>
                    <small> 
                        Remaining amount: 
                        <b> R{(room.price * room.avail_night + 200) - 1000}</b>
                    </small> */}
                    <br/> 
                    {/* <small>Estimated by {checkInDate}</small>                             */}
                    <hr/>

                    {/* <button onClick={handleSubmit}
                    >Proceed to Checkout</button> */}
                    <h6>Proceed to Checkout</h6>

                    <PayPalPayment 
                        checkoutInfo={checkoutInfo} 
                        setCheckoutStatus={setCheckoutStatus} 
                        setPaymentDetails={setPaymentDetails}
                    /> 
                    
                </div>                     
                            
            </div>
        </div> 
      
    </div>
  );
};

export default RoomBookingModal;