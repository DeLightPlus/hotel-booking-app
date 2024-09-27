import './auth.css';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser, setUser } from '../../redux/authSlice';

import SocialButton from '../SocialButton';

const Signin = () => 
{
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignin = async (e) =>
  {
    e.preventDefault();

    try
    {
      const res = await dispatch(loginUser({email, password})); 
      console.log('signin res', res);
      // dispatch(setUser(res.payload));
      
    }
    catch(error){ console.error(error);
    }   
    
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
              <Link to="/signup" className="create-account-link">Create a free account</Link>
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
              <SocialButton provider="Google" color="#DB4437" action='signin'/>
              {/* <SocialButton provider="Facebook" color="#4267B2" action='signin'/> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signin;
