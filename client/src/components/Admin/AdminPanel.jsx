import React, { useState, useEffect } from 'react';
import RoomForm from './RoomForm';
import { auth, db } from '../../config/firebase';
import { collection, onSnapshot, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import BookingList from '../dashboard/bookingsList';
import styles from '../dashboard/dashboard.module.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


const AdminPanel = () => 
{
  const user = useSelector((state) => state.auth.user);
  const adminUserData = useSelector((state) => state.auth.adminUserData);

  const [rooms_all, setRoomsAll] = useState([]);
  const [newRoom, setNewRoom] = useState({});
    
  const handleSubmit = (room) => 
    {
        if (room.id) 
        {
          // Update room
          const roomRef = doc(db, 'rooms', room.id);
          updateDoc(roomRef, room);
        }
        else 
        {
          // Add new room
          const roomsCollection = collection(db, 'rooms');
          addDoc(roomsCollection, room);
        }
    };

  return (

    <div className={styles.container}>
      <div className={styles.sidebar}>
        <ul>
          <li><Link to='#'>My Profile</Link></li>
          <li><Link to='#'>Notifications</Link></li>
          <li><Link to='Admin'>Rooms</Link></li>
          <li><Link to='#'>Bookings</Link></li>
          <li><Link to='#'>Customers</Link></li>
          <li><Link to='#'>Settings</Link></li>
        </ul>
      </div>    
      
      <div className={styles.content}> 
        
        <RoomForm onSubmit={handleSubmit} room={newRoom} />

        <h2>All Rooms</h2>
        <BookingList />
       

      </div>
    </div>
  );
};

export default AdminPanel;