import '../index.css';

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
                  {/* <label htmlFor="kids">Kids</label> */}
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

                {/* <fieldset className="check-compare">
                  <label htmlFor="adults">Adults</label>
                  <select
                    id="adults"
                    name="adults"
                    value={adults}
                    onChange={handleSelectChange}
                  >
                    {[...Array(5).keys()].map((value) => (
                      <option key={value} value={value}>
                        ADULTS ({value})
                      </option>
                    ))}
                  </select>
                </fieldset> */}

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
