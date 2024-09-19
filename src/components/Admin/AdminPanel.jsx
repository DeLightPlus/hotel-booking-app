import React, { useState, useEffect } from 'react';
import RoomForm from './RoomForm';

import { auth, db } from '../../config/firebase';
import { collection, onSnapshot, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';


const AdminPanel = () => 
{
  const [rooms, setRooms] = useState([]);
  const [newRoom, setNewRoom] = useState({});

  useEffect(() => {
    const roomsCollection = collection(db, 'rooms');
    onSnapshot(roomsCollection, (snapshot) => {
      const rooms = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setRooms(rooms);
    });
  }, []);

  const handleSubmit = (room) => {
    if (room.id) {
      // Update room
      const roomRef = doc(db, 'rooms', room.id);
      updateDoc(roomRef, room);
    } else {
      // Add new room
      const roomsCollection = collection(db, 'rooms');
      addDoc(roomsCollection, room);
    }
  };

  const handleDelete = (roomId) => {
    const roomRef = doc(db, 'rooms', roomId);
    deleteDoc(roomRef);
  };

  return (
    <div className='container'>
      <h1>Admin Panel</h1>
      <RoomForm onSubmit={handleSubmit} room={newRoom} />
      <h2>Available Rooms</h2>
      <ul>
        {rooms.map((room) => (
          <li key={room.id}>
            {room.room_name} ({room.capacity} guests)
            <button onClick={() => handleDelete(room.id)}>Delete</button>
            <button onClick={() => setNewRoom(room)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;