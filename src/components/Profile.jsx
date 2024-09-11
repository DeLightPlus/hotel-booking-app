import React, { useState, useEffect } from 'react';
import { auth, db } from '../config/firebase';
import { setDoc, doc } from 'firebase/firestore';

const Profile = () => 
{
  const [user, setUser] = useState(null);

  const fetchUserData = () =>
  {
    auth.onAuthStateChanged(async (user) => 
      {
        console.log(user);        
        if (user) 
        {           
          const userRef = doc(db, "users", user.uid);
          const userData = await getDoc(userRef);
          if(userData.exists())
          {
            setUser(userData.data());
          }
        } 
        else 
        {
          setUser(null);
        }
      });
  }
  
  useEffect(() => 
    {
      fetchUserData();
    }, []);



  return (
    <div className='container'>
      <h1>Welcome to the Home Page!</h1>
      {user && (
        <div>
          <p>Hello, {user.email}!</p>
          <p>Your name is {user.firstname} {user.lastname}.</p>
        </div>
      )}
    </div>
  );
};

export default Profile;