
import './styles.css';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signIn, signOut } from '../redux/userSlice';

const Header = ({ user, handleLogout }) => 
{
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const signedIn = useSelector((state) => state.user.signedIn);
  // const user = useSelector((state) => state.user.username);

  // const handleLogout = () => 
  // {
  //   alert('Trying To Logout');    
  //   dispatch(signOut());
  //   localStorage.removeItem('user');
  //   // navigate('/login');
    
  // }; 


  return (
    <div className='HeaderContainer'>
      <div className='HeaderTitle-Logo'>        
      </div>

      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-item" >
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item" >
              <Link to="/" className="nav-link">Rooms</Link>
            </li>
            <li className="nav-item" >
              <Link to="/" className="nav-link">Restaurent</Link>
            </li>
        </ul>

        <ul className="nav-list">
          <li className="nav-item" >
            <Link to="/" className="nav-link">Services</Link>
          </li>
          <li className="nav-item" >
            <Link to="/" className="nav-link">About</Link>
          </li>
          <li className="nav-item" >
            <Link to="/" className="nav-link">Contact</Link>
          </li>          
        </ul>

        {/* {console.log(signedIn)} */}
          {user && ( 
            <li className="nav-item">
              <div className='userBtn'>
                <button>
                  {/*  */}
                  {
                    user.displayName ?
                    <img src={user.photoURL} width={46} height={46}/>
                    : <i className="fa fa-user" style={{ fontSize: 32}}/>
                  }
                  
                </button>
              </div>

              <Link to="/profile" className="nav-link" >
                <span>
                  {
                    !user.displayName ? `${user.firstname.substring(0, 1).toUpperCase()} ${user.lastname}` : 
                    `${user.displayName.substring(0, 1).toUpperCase()}
                    ${user.displayName.split(" ").pop()}`
                  }
                </span>
              </Link>
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