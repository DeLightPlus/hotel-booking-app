import './Header.css';

import { useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';

import logo from '../../assets/logo.png'

const Header = ({ handleLogout }) => {
  const user = useSelector((state) => state.auth.user);
  const userData = useSelector((state) => state.auth.userData); 
 
  return (
    <div className='HeaderContainer'>
      <div className='HeaderTitle-Logo'>
        <img src={logo} />       
      </div>

      <nav className="nav">
        <ul className="nav-list">       

          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/rooms" className="nav-link">Rooms</Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link">Restaurent</Link>
          </li>
        </ul>      
        
          
        <ul className="nav-list">
          {/* <li className="nav-item">
            <Link to="/" className="nav-link">Services</Link>
          </li> */}
          <li className="nav-item">
            <Link to="/" className="nav-link">About</Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link">Contact</Link>
          </li>              
        
            

        {/* { console.log("user in Header:", user) }
        { console.log("userData in Header:", userData) } */}
        {
          user && (
            <>             
              <li className="nav-item">
                <Link to="/dashboard" className="nav-link">Dashboard</Link>                
              </li>
                
              <li className="nav-item" id="profile">
                <div className='userBtn'>
                  <Link>
                    {user.photoURL ? (
                      <img src={user.photoURL}/>
                    ) : (
                      <i className="fa fa-user" style={{ fontSize: 32}}/>
                    )}
                  </Link>
                </div>

                <Link to="/dashboard" className="nav-link">
                  <span>                 
                  {
                    userData ? 
                    (
                      `${userData.firstname.substring(0, 1).toUpperCase()} ${userData.lastname}`
                    ) : (  ` ${user.email} `  )
                  }
                  </span>
                </Link>
                <button className='signOut' onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
        )}
      </ul>

      </nav>
    </div>
  );
};

export default Header;