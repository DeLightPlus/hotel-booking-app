import styles from './dashboard.module.css';

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Sidebar from './sidebar.jsx';
import BookingList from './bookingsList.jsx';

// eslint-disable-next-line react/prop-types
const Dashboard = ({ handleLogout }) => {
  const user = useSelector((state) => state.auth.user);

  const [selectedPage, setSelectedPage] = useState('dashboard');

  return (
    <div className={styles.container}>      
      <Sidebar 
        setSelectedPage={setSelectedPage} 
        handleLogout={handleLogout}
      />

      <div className={styles.dashboard_content}>
        <div className={styles.content}>
          <div>
            <h4>Dashboard/ </h4>

            <div className={styles.summary_grid}>         

              <div className={styles.summary_card}>
                Rooms <hr/>
                <strong>8</strong>
              </div>

              <div className={styles.summary_card}>
                Available <hr/>
                <strong>3</strong>
              </div>

              <div className={styles.summary_card}>
                Booked<hr/>
                <strong>3</strong>            
              </div>


              <div className={styles.summary_card}>checked</div>
              
            </div>        
        </div> 

        {/* <Notifications /> */}
        <BookingList />
          
        </div>
      </div>
      
      
      
    </div>
  );
};

export default Dashboard;