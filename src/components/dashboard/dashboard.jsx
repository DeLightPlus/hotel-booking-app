import React from 'react';
import Notifications from './notifications';
import BookingList from './bookingsList';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './dashboard.module.css';

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const adminUserData = useSelector((state) => state.auth.adminUserData);

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <ul>
          <li><Link to='#'>My Profile</Link></li>
          <li><Link to='#'>Notifications</Link></li>
          <li><Link to='/dashboard/Admin'>Rooms</Link></li>
          <li><Link to='#'>Bookings</Link></li>
          <li><Link to='#'>Customers</Link></li>
          <li><Link to='#'>Settings</Link></li>
        </ul>
      </div>
      
      
      
      <div className={styles.content}>
        <div>Admin Dashboard | 
        {
          adminUserData ? (            
              <> {adminUserData.email} </>            
          ) : (` ${user.email} `)
        }

        <hr/>
        <div className={styles.summary_grid}>
          <div className={styles.summary_card}>
            Customers <hr/>
            <strong>3</strong>
          </div>

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
  );
};

export default Dashboard;