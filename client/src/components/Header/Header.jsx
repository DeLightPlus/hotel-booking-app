import './Header.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo.png';
import { useEffect, useState } from 'react';

// Navigation Links Component
const NavLinks = ({ links }) => (
  <ul className="nav-list">
    {links.map(({ to, label, key }) => (
      <li key={key} className="nav-item">
        <Link to={to} className="nav-link">{label}</Link>
      </li>
    ))}
  </ul>
);

// User Profile Component
const UserProfile = ({ user, userData }) => {
  return (
   
    <Link to="/dashboard" className="profile" id="profile">      
      <div className='userIcon'>        
          {user.photoURL ? (
            <img src={user.photoURL} alt="User Avatar" />
          ) : (
            <div className="icn">
              <i className="fa fa-user" style={{ fontSize: 32 }} />
            </div>
          )}     
      </div>  

      <div className='nameNemail'> 
          <div>
          {
            userData
            && ( `${userData.firstname[0].toUpperCase()} ${userData.lastname}` )
          }
          </div>  
          <small>             
            { user && ( ` ${user.email} ` ) }
          </small>                  
      </div>       
    </Link>   
  );
};

const Header = () => {
  const [isShrunk, setIsShrunk] = useState(false);  // State to manage shrink effect
  const user = useSelector((state) => state.auth.user);
  const userData = useSelector((state) => state.auth.userData);
  
   // Detect scroll and toggle shrink class
   useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsShrunk(true);  // Shrink header after 50px scroll
      } else {
        setIsShrunk(false);  // Reset header size when scroll is above 50px
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Apply the 'shrink' class when needed
  const headerClass = isShrunk ? 'HeaderContainer shrink' : 'HeaderContainer';

  // Common navigation links
  const commonLinks = [  
    { to: '/', label: 'Home', key: 'home' },
    { to: '/rooms', label: 'Rooms', key: 'rooms' },
    { to: '#restaurent', label: 'Restaurant', key: 'restaurant' },
  ];

  // Additional links for logged-in users
  const userLinks = [    
    { to: '/reviews', label: 'Reviews', key: 'reviews' },
    { to: '/contact', label: 'Contact', key: 'contact' }, 
  ];

  // Links for logged-in users only
  const loggedInLinks = [
    { to: '/dashboard', label: 'Dashboard', key: 'dashboard' },
  ];

  return (
    <div className={headerClass}>
      <div className='HeaderTitle-Logo' >
        <img src={logo} alt="Logo" />
      </div>

      <nav className="nav">
        {/* Common Links */}
        <NavLinks links={commonLinks} />
        {/* Additional Links for All Users */}
        <NavLinks links={userLinks} />
      </nav>

      {/* { user && (   <Link to={"/dashboard"} className="nav-link" id="dashboard">Dashboard</Link> ) } */}
      { user && (     
        <UserProfile user={user} userData={userData} />    
      )}

    </div>
  );
};

export default Header;
