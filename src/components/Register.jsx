import '../App.css'; 
import './signin_up.css';

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../config/firebase';
import { setDoc, doc } from 'firebase/firestore';

import SocialButton from './SocialButton';

const Register = () => 
{
  const naviate = useNavigate();

  const [firstname, setFirstname] = useState("");  
  const [lastname, setLastname] = useState("");
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) =>
  {
    e.preventDefault();
    
    try
    {   
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;  
      console.log(user);
      if(user)
      {
        const docRef = doc(db, "users", user.uid);
        await setDoc(docRef,
          {            
            email: user.email,
            firstname: firstname,
            lastname: lastname,
          });

        alert('User Registered Successfully!!');        
        naviate('/')
      }      
    }
    catch (error) { alert( error.message ); }

  }
  

  return (
    <section className="container">
      <div className="grid">
        {/* Image and Text Section */}
        <div className="image-text-section">
          <div className="background-image"></div>           

          <div className="overlay" />
          <div className="content">
            <h3 className="headline"> LUXURY Hotel & Restaurent <br className="hidden-break" /> book now </h3>
            <ul className="features-list">
              {['Commercial License', 'Room service', '120+ Coded Blocks', 'Swimming Pools Included'].map((text) => (
                <li key={text} className="feature-item">
                  <svg className="check-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sign In Form Section */}
        <div className="sign-in-form-section">
          <div className="form-container">
            <h2 className="form-title">Sign up to Rest-Le-BnB</h2>
            <p className="form-subtitle">
              Don’t have an account?{' '}
              <Link to="/login" className="create-account-link">Login</Link>
            </p>
            <form className="form" onSubmit={handleSignup}>
              <div className="form-field">
                <label className="form-label">Firstname</label>
                <input type="text" className="form-input"
                  placeholder="Enter your firstname"                  
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </div>

              <div className="form-field">
                <label className="form-label">Lastname</label>
                <input type="text" className="form-input"
                  placeholder="Enter your surname"                  
                  onChange={(e) => setLastname(e.target.value)}
                />
              </div>

              <div className="form-field">
                <label className="form-label">Email Address</label>
                <input type="email" className="form-input"
                  placeholder="Enter email to get started"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-field">
                <label className="form-label">Password</label>
                <input type="password" className="form-input"
                  placeholder="create your password"
                  onChange={(e) => setPassword(e.target.value)}                  
                />
              </div>
              <button type="submit" className="submit-button">
                Sign up
              </button>
            </form>
            <span>...or continue with </span>
            <div className="social-buttons">
              <SocialButton provider="Google" color="#DB4437" />
              <SocialButton provider="Facebook" color="#4267B2" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Register;