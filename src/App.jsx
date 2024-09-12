import './App.css';
import './index.js';

import Header from './components/Header.jsx';
import Register from './components/Register.jsx';
import Login from './components/Login.jsx';
import Profile from './components/Profile.jsx';

import HomePage from './components/HomePage.jsx';
import Dashboard from './components/Dashboard.jsx';

import { BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import { useEffect, useState } from 'react'; 

import { auth, db } from './config/firebase';
import { getDoc, doc } from 'firebase/firestore';


function App() 
{      
  // const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [signedIn, setSignedIn] = useState(false);

  if(signedIn) console.log('h-signed-in', signedIn); 

  const fetchUserData = async () =>
  {
      auth.onAuthStateChanged(async (user) => 
      {
          console.log('user',user);        
          if (user) 
          {           
            const userRef = doc(db, "users", user.uid);
            const userData = await getDoc(userRef);
            if(userData.exists())
            {            
              setUser(userData.data());
              console.log('userData', userData.data());
              
              alert('Welcome to Rest-Le-BnB, '+ userData.data().firstname)
            }
            else
            {
              alert('Failed to login')
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
  
  const handleLogout = async () =>
  {
    try
    {
      await auth.signOut();
      setUser(null);
      window.location.href='/';
    }
    catch (error){ console.error(error); }
  }
  
  
  return (
    <div className='Hotel-App'>      
      <BrowserRouter>
        <Header user={user} handleLogout={handleLogout}/>  
          
        <Routes>       

          <Route path='/' element={<HomePage user={user}/>} /> 
          <Route path='/register' 
            element={user ? <Navigate to='/profile'/> : <Register />} />
          <Route path='/login' 
            element={user ? <Navigate to='/profile'/> : <Login />} />          
          <Route path='/profile' 
            element={user ? <Profile user={user}/> : <Navigate to='/'/>} /> 

        </Routes>      
      </BrowserRouter>           
    </div>
  )
}

export default App
