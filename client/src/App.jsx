import './App.css';
import './components/styles.css';
import './index.css';

import { BrowserRouter, Navigate, Route,Routes } from 'react-router-dom';
import { useEffect } from 'react';

import { auth, db } from './config/firebase';
import { getDoc, doc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

import Header from './components/Header/Header.jsx';
import HomePage from './components/HomePage.jsx';
import Signup from './components/auth/signup.jsx';
import Signin from './components/auth/signin.jsx';

import Dashboard from './components/dashboard/dashboard.jsx';
import RoomDetails from './components/Rooms/RoomDetails.jsx';

import { useDispatch, useSelector } from 'react-redux';
import { clearUser, setUser } from './redux/authSlice.js';
import { fetchRooms, updateAllRoomsAvailabilityDaily } from "./redux/roomsSlice.js";
import Rooms from './components/Rooms/Rooms.jsx';
import Footer from './components/Footer/Footer.jsx';
import CompletePayment from './components/Paypal/CompletePayment.jsx';
import CancelPayment from './components/Paypal/CancelPayment.jsx';
import PayPalPayment from './components/Paypal/PayPalPayment.jsx';


function App() {
  const { user, userData } = useSelector((state) => state.auth);
  const rooms_all = useSelector((state) => state.rooms.rooms_all);

  const dispatch = useDispatch();

  useEffect(() => 
    {
      console.log('User state changed:', user);
      console.log('UserData state changed:', userData);

      onAuthStateChanged(auth, (user) => 
      {
        if (user) 
        {
          getDoc(doc(db, 'users', user.uid))
          .then((doc) => {
            const userData = doc.data();

            console.log('user ', user.uid, ' | ' , user.email , ' verified:', user.emailVerified ); 
            console.log('userData | ' , userData ); 

            dispatch( 
              setUser( { 
                user: { uid: user.uid, email: user.email, verified: user.emailVerified }, 
                userData: (userData.role ==='user') ? userData : null } )
            );
          });
        }
        else { dispatch(clearUser()); }
      });

      const fetchRoomsAsynch = async () =>
      { 
        const rooms = await dispatch( fetchRooms() ).unwrap(); 
        console.log('fetchRooms', rooms);                    
      }      
      fetchRoomsAsynch();
      
    }, [dispatch]);

  // Once rooms are fetched, update availability
  useEffect(() => {
    if (rooms_all.length > 0) 
    {
      dispatch(updateAllRoomsAvailabilityDaily());
    }
  }, [rooms_all, dispatch]);

  const handleLogout = async () => 
  {
    try 
    {
      await auth.signOut();
      dispatch(clearUser())
      // window.location.href = '/';
      console.log('Signed out');      
    } catch (error) { console.error(error); }
  }

  return (
    <div className='Hotel-App'>
      <BrowserRouter>  
        <Header  />
        <Routes>
          <Route exact path='/' element={<HomePage/>  } />
          
          <Route path='/signup' element={!user ? <Signup /> : <Navigate to={'/dashboard'}/>} />
          <Route path='/signin' element={ user ? <Navigate to={'/dashboard'} /> : <Signin /> } /> 
          
          <Route exact path='/dashboard' element={ user ? <Dashboard handleLogout={handleLogout} /> : <Navigate to={'/'}/> } />
          <Route path='/rooms' element={<Rooms/>} />
          {/* <Route path='/rooms/:id' element={<RoomDetails/>} /> */}

          <Route path='/make-payment' element={<PayPalPayment />} />          
          <Route path='/complete-payment' element={<CompletePayment />} />
          <Route path='/cancel-payment' element={<CancelPayment />} />
          
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App