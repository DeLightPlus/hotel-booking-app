import styles from './dashboard.module.css';

import Notifications from './notifications';
import BookingList from './bookingsList';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

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
        
        <div className={styles.summary_grid}>
          <div className={styles.summary_card}>
            Customers: 
            <strong>3</strong>
          </div>

          <div className={styles.summary_card}>
            Rooms:
            <strong>8</strong>
          </div>

          <div className={styles.summary_card}>
            Available:
            <strong>3</strong>
          </div>

          <div className={styles.summary_card}>
            Booked:
            <strong>3</strong>            
          </div>
                  
        </div>

        <BookingList />
        {/* <Notifications /> */}
        
      </div> 

    </div>
  );
};

export default Dashboard;