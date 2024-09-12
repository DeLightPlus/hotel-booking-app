import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInUser } from '../redux/userSlice';

import './signin_up.css'; // Make sure to create this CSS file
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../config/firebase';

const Login = () => 
{
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignin = async (e) =>
  {
    e.preventDefault();
    try 
    {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Login Successful!!!')
      navigate('/profile');
    }
    catch (error) { console.error(error.message) }

    
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
            <h2 className="form-title">Sign in to Rest-Le-BnB</h2>
            <p className="form-subtitle">
              Don’t have an account?{' '}
              <Link to="/register" className="create-account-link">Create a free account</Link>
            </p>
            <form className="form" onSubmit={handleSignin}>
              <div className="form-field">
                <label className="form-label">Email Address</label>
                <input type="email" className="form-input"
                  placeholder="Enter email to get started"
                  onChange={(e)=> setEmail(e.target.value)}
                />
              </div>
              <div className="form-field">
                <label className="form-label">Password</label>
                <input type="password" className="form-input"
                  placeholder="Enter your password"                  
                  onChange={(e)=> setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="submit-button" >
                Log in
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
  );
};

const SocialButton = ({ provider, color }) => (
  <button
    type="button"
    className="social-button"
    style={{ borderColor: color, color }}
  >
    <svg className="social-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      {provider === 'Google' ? (
        <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z" />
      ) : (
        <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z" />
      )}
    </svg>
    Sign in with {provider}
  </button>
);

export default Login;
