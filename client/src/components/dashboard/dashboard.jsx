import styles from './dashboard.module.css';

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Sidebar from './sidebar.jsx';
import BookingList from './bookingsList.jsx';

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);

  const [selectedPage, setSelectedPage] = useState('dashboard');

  return (
    <div className={styles.container}>      
      <Sidebar setSelectedPage={setSelectedPage} />

      <div className="dashboard-content">
        <div className={styles.content}>
          <div>
            {
              user && (` ${user.email} `)
            }
            <hr/>
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
              <div className={styles.summary_card}>6</div>
              <div className={styles.summary_card}>7</div>
              <div className={styles.summary_card}>8</div>
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