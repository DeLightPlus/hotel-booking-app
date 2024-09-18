import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RoomBookingModal = ({user}) => 
{
    
  const [roomType, setRoomType] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guests, setGuests] = useState(1);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [roomDescription, setRoomDescription] = useState('');

  const handleRoomTypeChange = (event) => {
    setRoomType(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Call API or perform booking logic here
    console.log('Booking submitted:', roomType, checkInDate, checkOutDate, guests, adults, children, roomDescription);
  };

  const handleCheckout = () =>
  {

  }

  return (
    <div className='booking-modal'>
      
        <h2>Room Booking</h2>
        <div className='room-details-block'>
            {/* <h5>Room Details</h5> */}
            <div style={{display:'flex', flexDirection:'column'}}>
                <label>Room: The Lookout Suite • 1 Luxury Room • 2 Adults</label>
                <label>Availablity: 2-nights stay <small>• <strong>Check-in</strong> [Fri, Sep 27] • <strong>Check-out</strong> [Sun, Sep 29]</small></label>
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
                <input type="date" 
                    onChange={(event) => { setCheckInDate(event.target.value) }} /><br/>
                Check-In
              </div>

              <div className="check-compare">
                <input type="date" 
                   onChange={(event) => { setCheckOutDate(event.target.value) }} /><br/>
                Check-Out
              </div>              

              <div className="check-compare"
                onChange={(event) => { setAdults(event.target.value); }} >
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
                onChange={(event) => { setChildren(event.target.value); }}>
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
                <label htmlFor=""> Guests <br/>({guests})</label>
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
                                <input type='text' id='fname' placeholder={user !== null ? `eg.(${user.firstname})` : 'Firstname'}/> 
                                <input type='text' id='lname' placeholder={user !== null ? `eg.(${user.lastname})` : 'Last name'}/>
                            </div>
                            <input text='email' id='email' placeholder={user !== null ? `eg.(${user.email})` : 'Email address'} /><br/>
                            
                            <div>
                                <select name="" id="code">
                                    <option value="USA +1">USA +1</option>
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

                        <div className='pay-method'>
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
                            <input id='sec-code' placeholder='__/10'/> 
                            <button onClick={handleCheckout}> checkout</button>
                        </div>
                          
                    </div>
                    <div className="room-showcase">
                        <img width='400' src="https://cdn.pixabay.com/photo/2016/10/18/09/02/hotel-1749602_960_720.jpg"/>
                        <br/>
                        <select>
                            <option value="">Bedding Request(optional)</option>   
                            <option value="">1 Double Bed</option>   
                            <option value="">2 Twin Beds</option>   
                        </select>
                        <br/><textarea placeholder='special requests'/>

                        <br /><button type="submit">Send Request</button>
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
                        <p>1 room x 2 nights <span>R1800.00</span></p>
                        <p>Taxes <span>R200.00</span></p>
                        <hr/>
                        <>
                            <strong>Total <span>R2000.00</span></strong> 
                            <br /> <h5>Deposits collected by property</h5>
                            <p><small>Your first payment <span>R1000.00</span></small></p>
                            <h6>Today</h6>
                            <p><small> Remaining amount <span>R1000.00</span></small></p>
                            <h6>Estimated by Sep 27, 2024</h6>
                        </>
                    </div>            
                </div>
            </div>  
            
        </form>
      
    </div>
  );
};

export default RoomBookingModal;