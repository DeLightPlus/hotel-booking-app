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
    <div className='container'>
      <div>
        <h2>Room Booking</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Room Type:
            <select value={roomType} onChange={handleRoomTypeChange}>
              <option value="">Select</option>
              <option value="single">Single</option>
              <option value="double">Double</option>
              <option value="suite">Suite</option>
            </select>
          </label>
          <br />

          <label>
            Check-in Date:
            <input type="date" value={checkInDate} 
                onChange={(event) => { setCheckInDate(event.target.value) }} />
          </label>
          <br />

          <label>
            Check-out Date:
            <input type="date" value={checkOutDate} 
                onChange={(event) => { setCheckOutDate(event.target.value) }} />
          </label>
          <br />

          <label>
            Number of Guests:
            <input type="number" value={guests} 
                onChange={(event) => { setGuests(event.target.value) }} />
          </label>
          <br />

          <label>
            Number of Adults:
            <input type="number" value={adults} 
                onChange={(event) => { setAdults(event.target.value); }} />
          </label>
          <br />

          <label>
            Number of Children:
            <input type="number" value={children} 
                onChange={(event) => { setChildren(event.target.value); }} />
          </label>
          <br />

          <button type="submit">Book Room</button>
        </form>
      </div>
    </div>
  );
};

export default RoomBookingModal;