import React, { useState, useEffect } from 'react';
import { auth, db } from '../config/firebase';
import { getDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Profile = ({user}) => 
{
  

  return (
    <div className='container'>
      <h1>Welcome to the Home Page!</h1>
      {
        user && 
        (
          user.displayName ? (
            <div>
              <p>Hello, {user.email}!</p>
              <p>Welcome: {user.displayName}</p>
            </div> 
          ): (
            <div>
              <p>Hello, {user.email}!</p>
              <p>Welcome: {user.firstname} {user.lastname}.</p>
            </div> 
          )          
        )
      }
    </div>
  );
};

export default Profile;