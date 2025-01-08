import './App.css';
import './components/styles.css';
import './index.css';

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';

import { auth, db } from './config/firebase';
import { getDoc, doc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

import { useDispatch, useSelector } from 'react-redux';
import { clearAdmin, setAdmin } from './redux/authSlice.js';
import { fetchRooms } from "./redux/roomsSlice.js";

import Header from './components//Header/Header.jsx';
import Signup from './components/auth/signup.jsx';
import Signin from './components/auth/signin.jsx';

import AdminPanel from './components/admin/AdminPanel.jsx';
import Dashboard from './components/dashboard/dashboard.jsx';
import RoomDetails from './components/RoomDetails.jsx';
import useAuthListener from './components/auth/useAuthListener.js';



function App() {
  const { user, adminData, loading, error } = useAuthListener();

  const dispatch = useDispatch();

  // Handle authentication state change
  useEffect(() => {  
    
    // Fetch rooms (assuming it fetches data for the app)
    const fetchRoomsAsynch = async () => {
      const rooms = await dispatch(fetchRooms()).unwrap();
      console.log('Rooms fetched:', rooms);
    };

    fetchRoomsAsynch();

  }, [dispatch]);

  const handleLogout = async () => {
    try 
    {
      await auth.signOut();
      dispatch(clearAdmin());  // Clear user data on logout
      console.log('Signed out');
    } 
    catch (error) { console.error(error); }
  };



  return (
    <div className="Hotel-App">
      <BrowserRouter>
        <Header handleLogout={handleLogout} />
        <Routes>
          {/* Public Routes */}
          <Route exact path="/" element={user ? <Navigate to="/dashboard" /> : <Signin />} />
          <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/dashboard" />} />
          <Route path="/signin" element={user ? <Navigate to="/dashboard" /> : <Signin />} />

          {/* Dashboard Route, available to all authenticated users */}
          <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" />} />

          {/* Room details route */}
          <Route path="/bookings/:id" element={<RoomDetails />} />

          {/* Admin Panel route, accessible only for users with 'role: admin' */}
          <Route path="/dashboard/Admin" element={adminData ? <AdminPanel /> : <Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
