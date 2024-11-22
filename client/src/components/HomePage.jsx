import '../index.css';

import restauantPic1 from "../assets/rest-hall-with-table.jpg";
import restauantPic2 from "../assets/reserved-sign.avif";
import restauantPic3 from "../assets/wine-glass.jpg";

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import BookingList from './dashboard/bookingsList';
import RoomDetails from './RoomDetails';
import GetStarted from './getstarted';
import Socials from './socials';
import Amenities from './amenities';

// import AvailableRooms from './availableRooms';

const HomePage = () => 
{  
  const user = useSelector((state) => state.auth.user);
  const userData = useSelector((state) => state.auth.userData); 
  const adminUserData = useSelector((state) => state.auth.adminUserData);

  const rooms_all = useSelector((state) => state.rooms.rooms_all);

  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [kids, setKids] = useState(0);
  const [adults, setAdults] = useState(0);

  // Handler for date change
  const handleDateChange = (event) => {
    const { name, value } = event.target;
    if (name === 'checkIn') {
      setCheckInDate(value);
    } else if (name === 'checkOut') {
      setCheckOutDate(value);
    }
  };

  // Handler for select change
  const handleSelectChange = (event) => {
    const { name, value } = event.target;
    if (name === 'kids') {
      setKids(value);
    } else if (name === 'adults') {
      setAdults(value);
    }
  };

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
          <GetStarted />
        }  
        
        {/* <Socials />     */}

        <div className='showcase-container'>        
          
            {/* <Amenities /> */}
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

        <div className="rooms-container">
          <section className="rooms-showcase">
            <div className="checkin-rectangle">
                <fieldset className="check-compare">
                  <label htmlFor="checkIn">Check-In</label>
                  <input
                    type="date"
                    id="checkIn"
                    name="checkIn"
                    value={checkInDate}
                    onChange={handleDateChange}
                  />
                </fieldset>

                <fieldset className="check-compare">
                  <label htmlFor="checkOut">Check-Out</label>
                  <input
                    type="date"
                    id="checkOut"
                    name="checkOut"
                    value={checkOutDate}
                    onChange={handleDateChange}
                  />
                </fieldset>

                <fieldset className="check-compare">
                  <select
                    id="kids"
                    name="kids"
                    value={kids}
                    onChange={handleSelectChange}
                  >
                    {[...Array(5).keys()].map((value) => (
                      <option key={value} value={value}>
                        Guests ({value})
                      </option>
                    ))}
                  </select>
                </fieldset>               

                <div className="check-compare">
                  <button>COMPARE NOW</button>
                </div>
            </div>

            <div className="rooms-showcase-title">
              <small>Rest-Le-BnB</small> | Available Rooms (8)
              <hr />
              <BookingList />
            </div>
          </section>
        </div>

        <div className="restaurant-showcase">            
            

            <div className="grid-content">              

              <div className="grid-item item1">
                <div className="restaurant-showcase-title">
                  <small>Rest-Le-BnB</small> | Restaurent                           
                </div>
                <img src={restauantPic1} height={600}/>
              </div>
              
              <div className="grid-item item2"><img src={restauantPic2} height={300}/></div>
              <div className="grid-item item3"><img src={restauantPic3} height={300}/></div>

            </div>
            
        </div>

      </div>
      
    </div>
  );
};

export default HomePage;
