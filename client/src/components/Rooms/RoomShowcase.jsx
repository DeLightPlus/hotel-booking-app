import "./Rooms.css";

import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import RoomsList from "./RoomsList";

const RoomShowcase = ({page}) => 
{
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);
    const userData = useSelector((state) => state.auth.userData); 
    
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

 

    const handleBookingModal = () =>
    {
        navigate('/booking');
    }

    return ( 
        <>
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


                { page == "homepage" &&
                <div className="rooms-showcase-title">
                    <small>Rest-Le-BnB</small> | Available Rooms (8)
                    <hr />
                    <RoomsList />
                </div> 
                }
                
                </section>
            </div>
        </>
     );
}
 
export default RoomShowcase;