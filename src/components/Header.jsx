
import './styles.css';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signIn, signOut } from '../redux/userSlice';

const Header = ({ showEntry, setShowEntry }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const signedIn = useSelector((state) => state.user.signedIn);
  const user = useSelector((state) => state.user.username);

  if(signedIn) console.log('h-signed-in', signedIn); 

  useEffect(() => 
    {
      const user = JSON.parse(sessionStorage.getItem('user'));   
      
      if(user)
      {
        console.log('header_user',user);       
        dispatch(signIn(user)); // Dispatch signIn action 
      } 
      else 
      {
        dispatch(signOut());
      }
    }, []);

  const handleLogout = () => 
  {
    // alert('trying logout');    
    dispatch(signOut());
    localStorage.removeItem('user');
    navigate('/login');
  };


  return (
    <div className='HeaderContainer'>
      <div className='HeaderTitle-Logo'>        
      </div>

      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-item" onClick={() => setShowEntry(false)}>
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item" onClick={() => setShowEntry(false)}>
              <Link to="/" className="nav-link">Rooms</Link>
            </li>
            <li className="nav-item" onClick={() => setShowEntry(false)}>
              <Link to="/" className="nav-link">Restaurent</Link>
            </li>
        </ul>

        <ul className="nav-list">
          <li className="nav-item" onClick={() => setShowEntry(false)}>
            <Link to="/" className="nav-link">Services</Link>
          </li>
          <li className="nav-item" onClick={() => setShowEntry(false)}>
            <Link to="/" className="nav-link">About</Link>
          </li>
          <li className="nav-item" onClick={() => setShowEntry(false)}>
            <Link to="/" className="nav-link">Contact</Link>
          </li>          
        </ul>

        {console.log(signedIn)}
          {signIn && ( 
            <li className="nav-item">
              <div className='userBtn'>
                <button><i className="fa fa-user"
                style={{ fontSize: 32}}/></button>
              </div>

              <Link to="/" className="nav-link">{user}</Link><br/>
              <button className='signOut' 
                onClick={() =>  handleLogout() }>
                  Logout
              </button> 
            </li>
          )}
      </nav>

    </div>
  );
};

export default Header;