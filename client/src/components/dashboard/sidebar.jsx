import styles from './dashboard.module.css';

import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ setSelectedPage }) => {
  return (
    <div className={styles.sidebar}>
      <h2 className="sidebar-logo">Hotel Booking</h2>
      
      <ul className="sidebar-menu">
        <li onClick={() => setSelectedPage('profile')}>Profile</li>
        <li><Link to='#'>Notifications</Link></li>
        <li onClick={() => setSelectedPage('bookings')}>My Bookings</li>

        <li onClick={() => setSelectedPage('dashboard')}>Dashboard</li>
        <li onClick={() => setSelectedPage('searchRooms')}>Search Rooms</li>
        
        <li><Link to='#'>Settings</Link></li>
        <button><Link to='#'>Logout</Link></button>
      </ul>
    </div>
  );
};

export default Sidebar;



