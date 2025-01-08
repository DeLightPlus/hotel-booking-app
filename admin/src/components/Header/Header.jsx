import './Header.css';

import { useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { getIcon } from '../../utils/icons';

const Header = ({ handleLogout }) => {
  const { user, adminData, loading, error } = useSelector((state) => state.auth);
  {console.log('u:', user) }
  {console.log('au.dat:', adminData) }

  if (loading) 
  {
    return <div>Loading...</div>;  // or a more sophisticated loading spinner
  }

  if (!user || !adminData) 
  {
    // handleLogout()
    // return <div>Admin data is not available or user is not authenticated</div>;
  }

  return (
    <div className='HeaderContainer'>
      <div className='HeaderTitle-Logo'>    
            
      </div>
      <nav className="nav">
        <ul className="nav-list">
          {/* <li>
            <div className='search-group'>
              <select placeholder={``}>
                <option value="">Location</option>
              </select>
              <input placeholder='Search' />
              <button>
                <i className="fas fa-search"/>
              </button>
            </div>
          </li> */}

          
          <li className="nav-item">
            <Link to="/" className="nav-link">Rooms</Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link">Restaurent</Link>
          </li>
        </ul>
        
        {
          adminData ? (
          <ul className="nav-list">
           
            <li className="nav-item">
              <Link to="/Admin" className="nav-link">Admin</Link>
            </li>
            <li className="nav-item">
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
            </li>
          </ul>
          ) : (
            <ul className="nav-list">
              <li className="nav-item">
                <Link to="/" className="nav-link">Services</Link>
              </li>
              <li className="nav-item">
                <Link to="/" className="nav-link">About</Link>
              </li>
              <li className="nav-item">
                <Link to="/" className="nav-link">Contact</Link>
              </li>
            </ul>
          ) 
        }        
      </nav>

        
        {
          user && (
            <div className="userProfile">
              <div className='userIcon'>               
                  {
                    user.photoURL ? 
                    ( <img src={user.photoURL}/>
                    ) : 
                    ( 
                      <div className="icn">
                        {/* <i className="fa fa-user" style={{ fontSize: 32}}/> */}
                        { getIcon("fa-user", 32) }
                      </div> 
                    )
                  }                               
              </div>  
              
              <div className='nameNemail'> 
                  <div>
                    {
                      adminData && 
                      ( `${adminData.firstname.substring(0, 1).toUpperCase()} ${adminData.lastname}` ) 
                    }
                  </div>  
                  <small>             
                    { user && ( ` ${user.email} ` ) }
                  </small> 
                  {/* <button className='signOut' onClick={handleLogout}>
                    Logout
                  </button>   */}
              </div>               

            </div>  
        )}
    </div>
  );
};

export default Header;