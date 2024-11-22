import '../index.css';

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import BookingList from './dashboard/bookingsList';
import RoomDetails from './RoomDetails';

// import AvailableRooms from './availableRooms';


const HomePage = () => 
{  
  const user = useSelector((state) => state.auth.user);
  const userData = useSelector((state) => state.auth.userData); 
  const adminUserData = useSelector((state) => state.auth.adminUserData);

  const rooms_all = useSelector((state) => state.rooms.rooms_all);

  // console.log('home-user?, ',user);
  // console.log('home-userData?, ',userData);
  // console.log('home-adminUserData?, ',adminUserData);
  console.log('rooms_all', rooms_all);

  const navigate = useNavigate();

  const handleBookingModal = () =>
  {
    navigate('/booking');
  }


  return (
    <div className="home-page"> 

      <div className='grid-container'>
        {
          user == null &&
          <div className="getStarted">          
              <button className='getStarted-btn'
                onClick={()=> { navigate('/signup')}}> Get Started
              </button> 
              <div><small>Already have an account? </small><br/><Link to={'/signin'}>Signin</Link></div>
          </div>  
        }  
        
        <div className="socials-btn-group">
          <button>
            <i className="fab fa-facebook-f" /> 
          </button>

          <button>
            <i className="fab fa-twitter" />
          </button>

          <button>
            <i className="fab fa-linkedin-in" />
          </button>
        </div>     

        <div className='showcase-container'>
          <h2>Enjoy and unwind at your luxurious vacation hotel.</h2>
          <p>
            Elevating outstanding hotels to unparalleled excellence & extraordinary levels.
          </p>
          <hr></hr>
          <div className='showcase-h-group'>
            <div className="amenities">
              <h3>Hotel Amenities</h3><hr/>
              <ul>
                <li><i className="fa fa-wifi"/> 
                  Free Wi-Fi
                  <i className='far fa-check-circle'/>
                </li>

                <li><i className="fa fa-coffee" /> 
                  Free Breakfast 
                  <i className='far fa-check-circle'/>
                </li>

                <li><i className="fa fa-parking" /> 
                  Free Parking
                  <i className='far fa-check-circle'/>
                </li>

                <li><i className="fa fa-utensils"/>
                  Restaurant On Site
                  <i className='far fa-check-circle'/>
                </li>

                <li><i className="fa fa-cocktail"/>
                  MiniBar Lounge
                  <i className='far fa-check-circle'/>
                </li>              

                <li><i className="mdi mdi-pool" /> 
                  Swimming Pool
                  <i className='far fa-check-circle'/>
                </li> 

                <li><i className="fa fa-dumbbell" /> 
                  Gym Room
                  <i className='far fa-check-circle'/>
                </li>

                <li><i className="fa fa-smoking"/>
                    Smoking Room
                    <i className='fa fa-ban'/>
                </li> 

                <li><i className="fa fa-hands-wash"/>
                    Laundry Service 
                    <i className='fa fa-ban'/>
                </li>  

                <li><i className="fa fa-concierge-bell"/> 
                    Room Service 
                    <i className='fa fa-ban'/>
                </li>     

                <li><i className="fa fa-child"/> 
                    Child Section 
                    <i className='fa fa-ban'/>
                </li>    

                <li><i className="fas fa-users"/> 
                    Meetings 
                    <i className='fa fa-ban'/>
                </li>           
              </ul>
            </div>

            <div className="showcase">
              <p><i className="fa fa-map-pin"/> 
                 {'  '}South Africa, 
                <small> ... show locations</small>
                </p>
              <strong className="headline">
                Experience the ultimate in luxury and comfort at our hotel and restaurant.          
              </strong>
              
              ----<button>Show More</button>----      
            </div>
          </div>        
        </div>       

        <div className="rooms-container">
          
          <div className="rooms-showcase">
            <div className='checkin-rectangle'>
              <div className="check-compare">
                <input type="date" /><br/>
                Check-In
              </div>

              <div className="check-compare">
                <input type="date" /><br/>
                Check-Out
              </div>

              <div className="check-compare">
                <select>
                  <option value="0">KIDS (0)</option>
                  <option value="1">KIDS (1)</option>
                  <option value="2">KIDS (2)</option>
                  <option value="3">KIDS (3)</option>
                  <option value="4">KIDS (4)</option>
                </select>
                {/* Kids(0) */}
              </div>

              <div className="check-compare">
                <select>
                    <option value="0">ADULTS (0)</option>
                    <option value="1">ADULTS (1)</option>
                    <option value="2">ADULTS (2)</option>
                    <option value="3">ADULTS (3)</option>
                    <option value="4">ADULTS (4)</option>
                  </select>
                  {/* Adults(0) */}
              </div>

              <div className="check-compare">
                <button>COMPARE NOW</button>
              </div>
            </div>
            <div className="rooms-showcase-title">
              <small>Rest-Le-BnB</small> | Available Rooms ( 8 )
              <hr/>
               <BookingList />              
                         
            </div>

           
            
          </div>     

        </div>

        <div className="restaurant-showcase">            
            <div className="restaurant-showcase-title">
              <small>Rest-Le-BnB</small> | Restaurent
              <hr/>              
            </div>

            <div className="grid-content">              

              <div className="grid-item item1">Item 1</div>
              <div className="grid-item item2">Item 2</div>
              <div className="grid-item item3">Item 3</div>

            </div>
            
        </div>

      </div>
      
    </div>
  );
};

export default HomePage;
