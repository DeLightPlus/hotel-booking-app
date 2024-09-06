import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInUser } from '../redux/userSlice';

// function Login() {

//     const dispatch = useDispatch();
//     const signedIn = useSelector((state) => state.user.signedIn);
//     const navigate = useNavigate();

//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');


//   const handleSubmit = async (event) =>
//     {
//         event.preventDefault();        
//         try 
//         {
//             const response = await dispatch( signInUser({ email, password }) );
//             console.log('signin.res', response);
//             if(response){ navigate('/'); }
//         }
//         catch (error) {  console.error(error); }
//     };

//     console.log('Login.signedIn', signedIn);
//     if (signedIn) { navigate('/'); }

//   return (
//     <div className="login-form">
//       <h2 className="form-title">Login</h2>
//       <form onSubmit={handleSubmit} className="form">
//         <label className="form-label">
//           Email:
//           <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-input" />
//         </label>
//         {/* <br /> */}
//         <label className="form-label">
//           Password:
//           <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-input" />
//         </label>
//         <br />
//         <button type="submit" className="form-button">Login</button>
//       </form>
//       <p className="form-text">Don't have an account? <Link to="/register" className="form-link">Register</Link></p>
//     </div>
//   );
// }

// export default Login;



import './signinOup.css'; // Make sure to create this CSS file

const Login = () => {
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
            <form className="form">
              <div className="form-field">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter email to get started"
                  className="form-input"
                />
              </div>
              <div className="form-field">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="form-input"
                />
              </div>
              <button
                type="submit"
                className="submit-button"
              >
                Log in
              </button>
            </form>
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
