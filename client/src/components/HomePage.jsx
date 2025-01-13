import '../index.css';

import restauantPic1 from "../assets/rest-hall-with-table.jpg";
import restauantPic2 from "../assets/reserved-sign.avif";
import restauantPic3 from "../assets/wine-glass.jpg";

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import BookingList from './dashboard/bookingsList';
import RoomDetails from './Rooms/RoomDetails';
import GetStarted from './getstarted';
import Socials from './socials';
import Amenities from './amenities';
import Contact from './contact/contact';
import FAQ from './faq/faq';
import Testimonials from './Reviews/Testimonial';
import RoomShowcase from './Rooms/RoomShowcase';
import AboutUs from './about/about';

// import AvailableRooms from './availableRooms';

const HomePage = () => 
{  
  const user = useSelector((state) => state.auth.user);
  const userData = useSelector((state) => state.auth.userData); 

  const rooms_all = useSelector((state) => state.rooms.rooms_all);

  return (
    <div className="home-page"> 

      <div className='grid-container'>
        {
          user == null &&
          <GetStarted />
        }  
        
        {/* <Socials />     */}

        <div className='showcase-container' id="rooms"> 
            {/* <Amenities /> */}
            <div className="showcase">
              {/* <p><i className="fa fa-map-pin"/> 
                 {'  '}South Africa, 
                <small> ... show locations</small>
              </p> */}
              <strong className="headline">
                <big>Unforgettable Escapes</big><br/>
                Experience the ultimate in luxury and comfort at our hotel and restaurant.          
              </strong>
              <strong className="">
                4.8/5.0 (4597 Average rates on Google Review)
              </strong>
             
              <br />    
            </div>

            <RoomShowcase page="homepage"/>     
        </div> 

        <div className="restaurant-showcase">            
            

            <div className="grid-content">              

              <div className="grid-item item1">
                <div className="restaurant-showcase-title">
                  <small>Rest-Le-BnB</small> <span>Restaurent  </span>                       
                </div>
                <img src={restauantPic1} height={600}/>
              </div>
              
              <div className="grid-item item2"><img src={restauantPic2} height={300}/></div>
              <div className="grid-item item3"><img src={restauantPic3} height={300}/></div>

            </div>
            
        </div>

        <Testimonials />
        <Contact />
        <FAQ />
        <AboutUs />

      </div>
      
    </div>
  );
};

export default HomePage;
