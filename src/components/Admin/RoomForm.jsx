import React, { useState } from 'react';

const RoomForm = ({ onSubmit, room }) => 
{
  const [roomName, setRoomName] = useState(room ? room.room_name : '');
  const [roomDescription, setRoomDescription] = useState(room ? room.room_description : '');
  const [capacity, setCapacity] = useState(room ? room.capacity : '');
  const [price, setPrice] = useState(room ? room.price : '');
  const [availability, setAvailability] = useState(room ? room.availability : '');
  const [availNights, setAvailNights] = useState(room ? room.avail_night : '');
  const [status, setStatus] = useState(room ? room.status : '');
  const [rating, setRating] = useState(room ? room.rating : '');
  const [image, setImageURL] = useState(room ? room.image : '');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      room_name: roomName,
      room_description: roomDescription,
      capacity: parseInt(capacity),
      price: parseInt(price),
      availability,
      avail_night: parseInt(availNights),
      status,
      rating,
      image,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Room Name:
        <input type="text" value={roomName} onChange={(event) => setRoomName(event.target.value)} />
      </label>
      <br />
      <label>
        Room Description:
        <input type="text" value={roomDescription} onChange={(event) => setRoomDescription(event.target.value)} />
      </label>
      <br />
      <label>
        Capacity:
        <input type="number" value={capacity} onChange={(event) => setCapacity(event.target.value)} />
      </label>
      <br />
      <label>
        Price:
        <input type="number" value={price} onChange={(event) => setPrice(event.target.value)} />
      </label>
      <br />
      <label>
        Availability:
        <input type="text" value={availability} onChange={(event) => setAvailability(event.target.value)} />
      </label>
      <br />
      <label>
        Available Nights:
        <input type="number" value={availNights} onChange={(event) => setAvailNights(event.target.value)} />
      </label>
      <br />
      <label>
        Status:
        <input type="text" value={status} onChange={(event) => setStatus(event.target.value)} />
      </label>
      <br />
      <label>
        Rating:
        <input type="text" value={rating} onChange={(event) => setRating(event.target.value)} />
      </label>
      <br />
      <label>
        Image:
        <input type="text" onChange={(event) => setImageURL(event.target.value)} />
      </label>
      <br />
      <button type="submit">Save</button>
    </form>
  );
};

export default RoomForm;