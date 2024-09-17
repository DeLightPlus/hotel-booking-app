import React, { useState } from 'react';

const RoomBookingModal = () => {
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

  return (
    <div className='booking-modal'>
      
        <h2>Room Booking</h2>
        <div className='room-details-block'>
            {/* <h5>Room Details</h5> */}
            <div style={{display:'flex', flexDirection:'column'}}>
                <label>Room: The Lookout Suite • 1 Luxury Room • 2 Adults</label>
                <label>Availablity: 2-nights stay <sub>• <strong>Check-in</strong> [Fri, Sep 27] • <strong>Check-out</strong> [Sun, Sep 29]</sub></label>
                <label>Availablity:</label>
                
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
                <div class="grid-item item1">
                    <button type="submit">Book Room</button>
                </div>

                <div class="grid-item item2">
                    <h5>Payment Method</h5>
                    <small>Name on Card</small><br/>
                    <input placeholder='name'/><br/>
                    <small>Debit/Credit card number</small><br/>
                    <input placeholder="Debit/Credit card number"/><br/>
                    <small>Expiration date</small><br/>
                    <select>
                        <option value="Month">Month</option>
                        <option value="1">01</option>
                        <option value="2">02</option>
                    </select>
                    <select>
                        <option value="Year">Year</option>
                        <option value="1">01</option>
                        <option value="2">02</option>
                    </select>
                    <br/> 
                    <small>security code</small><br/>
                    <input placeholder='__/10'/>
                </div>


                <div class="grid-item item3">Map</div>
            </div>  

            
        </form>
      
    </div>
  );
};

export default RoomBookingModal;