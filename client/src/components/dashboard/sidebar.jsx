import styles from './dashboard.module.css';

import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ setSelectedPage, handleLogout }) => {
  return (
    <div className={styles.sidebar}>      
      <ul className="sidebar-menu">
        <h2 className="sidebar-logo">Hotel Booking</h2>

        <li onClick={() => setSelectedPage('profile')}>Profile</li>
        <li><Link to='#'>Notifications</Link></li>
        <li onClick={() => setSelectedPage('bookings')}>My Bookings</li>

        <li onClick={() => setSelectedPage('dashboard')}>Dashboard</li>
        <li onClick={() => setSelectedPage('searchRooms')}>Search Rooms</li>
        
        <li><Link to='#'>Settings</Link></li>
        
        
      </ul>

      <button className='logout-btn' onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Sidebar;



