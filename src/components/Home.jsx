import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <div>
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

export default Home;