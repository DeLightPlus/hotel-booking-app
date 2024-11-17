import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PaymentMethod from './PaymentForm';

const RoomBookingModal = ({room}) => 
{

    const user = useSelector((state) => state.auth.user);
    const userData = useSelector((state) => state.auth.userData); 
    const adminUserData = useSelector((state) => state.auth.adminUserData);
    
    const [roomType, setRoomType] = useState('');
    const [checkInDate, setCheckInDate] = useState(`${new Date().toISOString().split('T')[0]}`);
    const [checkOutDate, setCheckOutDate] = useState('');
    const [guests, setGuests] = useState(0);
    const [adults, setAdults] = useState(0);
    const [children, setChildren] = useState(0);
    const [roomDescription, setRoomDescription] = useState('');

    const [checkoutInfo, setCheckoutInfo] = useState({ uid:user.uid, room:room.id, deposit: 0, success: false })
    const [paymentProcessed, setPaymentProcessed] = useState(false);

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


  const handlePaymentProcessed = (success) => 
  {
    setPaymentProcessed(success);
    if (success) 
    {
      // Proceed with booking after payment
      handleBookingSubmit();
    }
  };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Call API or perform booking logic here
        console.log('Booking submitted:', roomType, checkInDate, checkOutDate, guests, adults, children, roomDescription);
    };

  return (
   
    <div className='booking-modal'>
         { console.log('room: ', room)    }
         {/* { console.log('roombooking.a_u?: ', adminUserData)    }
         { console.log('roombooking.u?: ', userData)    } */}
        <h2>{ room.room_name}</h2>
        <div className='room-details-block'>
            {/* <h5>Room Details</h5> */}
            <div style={{display:'flex', flexDirection:'column'}}>
                <label> • {room.room_description} • {room.capacity} guests</label>
                <label> Availablity: {room.avail_night}-nights stay 
                    <small> 
                        • <strong>Check-in</strong> [{room.avail_check_in}] 
                        • <strong>Check-out</strong> [{room.avail_check_out}]
                    </small>
                </label>
                {/* <label>Availablity:</label> */}                
            </div>
        </div>
        
        <form onSubmit={handleSubmit}>

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
                {/* <small>Check-In</small> */}
                <input type="date" min={new Date().toISOString().split('T')[0]}
                    onChange={(event) => { setCheckInDate(event.target.value) }} /><br/>
              </div>

              <div className="check-compare">
                {/* Check-Out */}
                <input type="date" min={checkInDate}
                   onChange={(event) => { setCheckOutDate(event.target.value) }} /><br/>
             </div>              

              <div className="check-compare"
                onChange={handleAdultsChange} >
                <select>
                    <option value="0">ADULTS (0)</option>
                    <option value="1">ADULTS (1)</option>
                    <option value="2">ADULTS (2)</option>
                    <option value="3">ADULTS (3)</option>
                    <option value="4">ADULTS (4)</option>
                  </select>
                  {/* Adults(0) */}
              </div>

              <div className="check-compare"
                onChange={handleChildrenChange}>
                <select>
                  <option value="0">KIDS (0)</option>
                  <option value="1">KIDS (1)</option>
                  <option value="2">KIDS (2)</option>
                  <option value="3">KIDS (3)</option>
                  <option value="4">KIDS (4)</option>
                </select>
                {/* Kids(0) */}
              </div>  

              <div className="check-compare">
                <label htmlFor=""> Guests[{guests}]</label>
                {/* Kids(0) */}
              </div>            
            </div>

            <div className="grid-content"> 
                <div className="grid-item item1">
                    <div className='booking-pay'>

                        <div className='who-checking'>
                            <strong>Who's checking in?</strong><br/>
                            <div>
                                {console.log(user)}
                                <input type='text' id='fname' 
                                    placeholder={ 
                                        userData !== null ? `eg.(${userData.firstname})` 
                                            : adminUserData !== null ? `eg.(${adminUserData.firstname})` : 'Firstname' }/> 
                                <input type='text' id='lname' 
                                    placeholder={ 
                                        userData !== null ? `eg.(${userData.lastname})` 
                                            : adminUserData !== null ? `eg.(${adminUserData.lastname})` : 'Lastname' }/> 
                            </div>
                            <input text='email' id='email' value={user.email} placeholder={user !== null ? `eg.(${user.email})` : 'Email address'} /><br/>
                            
                            <div>
                                <select name="" id="code">                                    
                                    <option value="ZAR +27">ZAR +27</option>
                                </select><input type='text' placeholder=' 00 000 0000'/>
                            </div>

                            <div>
                                <input type="checkbox" />{' '}
                                    <small> 
                                        Receive text alerts about this trip.
                                        <h5> Message and data rates may apply.</h5>
                                    </small>
                            </div>
                        </div>

                        <PaymentMethod 
                            checkoutInfo={checkoutInfo} 
                            setCheckoutInfo={setCheckoutInfo}
                            onPaymentProcessed={handlePaymentProcessed}
                        />

                        {/* <div className='pay-method'>
                            <strong>Payment Method</strong>
                            <h6>Name on Card</h6>
                            <input type='text' id='cardname'/><br/>
                            <h6>Debit/Credit card number</h6>
                            <input type='number' id='cardnumber' placeholder="0000 0000 0000 0000"/><br/>
                            <h6>Expiration date</h6>
                            <select id='exp-mon'>
                                <option value="Month">Month</option>
                                <option value="1">01</option>
                                <option value="2">02</option>
                            </select>/ 
                            <select id='exp-yr'>
                                <option value="Year">Year</option>
                                <option value="1">01</option>
                                <option value="2">02</option>
                            </select>                            
                            <h6>security code</h6>
                            <input id='sec-code' placeholder='cvc'/> 
                            <button onClick={handleCheckout}> checkout</button>
                        </div> */}
                          
                    </div>

                    <div className="room-showcase">
                        <div className="amenities">                        
                            <ul style={{flexDirection:'row'}}>
                                <strong>Amenities:</strong>
                                <li><i className="fa fa-wifi"/></li>                            
                                <li><i className="fa fa-hands-wash"/></li>  
                                <li><i className="fa fa-concierge-bell"/></li>                                        
                            </ul>                        
                        </div>

                        <img width='100%' src="https://cdn.pixabay.com/photo/2016/10/18/09/02/hotel-1749602_960_720.jpg"/>
                        <br/>
                        <select>
                            <option value="">Bedding Request(optional)</option>   
                            <option value="">1 Double Bed</option>   
                            <option value="">2 Twin Beds</option>   
                        </select>
                        <br/><textarea placeholder='special requests'/>

                        {/* <br /><button type="submit">Send Request</button> */}
                    </div>
                    
                </div>

                <div className="grid-item item2">                   
                    <div className="gmap-frame">    
                        <h4>Polokwane, Limpopo Connexion</h4>                    
                        <iframe width="100%" height="100%" frameBorder="0" scrolling="yes" marginHeight="0" marginWidth="0" 
                            src="https://maps.google.com/maps?width=100%&amp;height=100%&amp;hl=en&amp;q=polokwane+(Limpopo%20Connexion)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
                            <Link href="https://www.gps.ie/">gps trackers</Link>
                        </iframe>                        
                    </div>  
                </div>


                <div className="grid-item item3">
                    <div className='pricing-info'>
                        <strong>Pricing Information</strong>
                        <hr/>
                        <label> R{room.price} room x {room.avail_night} nights <>R{room.price * room.avail_night}</></label>
                        <label> Taxes <>R200</></label>
                        <hr/>
                        <>
                            <strong>Total <>R{room.price * room.avail_night + 200}</></strong> 
                            <br /> <h5>Deposits collected by property</h5>
                            <div>
                                <strong>Your first payment: <>R1000</></strong>                                                                
                            </div>
                            <small>Today</small>
                            
                            <p>
                                <strong> 
                                    Remaining amount: 
                                    <> R{(room.price * room.avail_night + 200) - 1000}</>
                                </strong>                               
                            </p>
                            <small>Estimated by {checkInDate}</small>
                            
                        </>
                    </div> 

                    {paymentProcessed && <div><button>Submit Booking</button></div>}           
                </div>
            </div>  
            
        </form>
      
    </div>
  );
};

export default RoomBookingModal;