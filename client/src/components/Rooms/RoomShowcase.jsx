import "./Rooms.css";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import RoomsList from "./RoomsList";

const RoomShowcase = ({page}) => 
{
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);
    const userData = useSelector((state) => state.auth.userData); 
    
    const rooms_all = useSelector((state) => state.rooms.rooms_all);    

    const today = new Date().toISOString().split('T')[0];

    const [filteredRooms, setFilteredRooms] = useState(rooms_all);
    const [checkInDate, setCheckInDate] = useState(today);
    const [checkOutDate, setCheckOutDate] = useState(new Date( new Date(today).setDate(new Date(today).getDate() + 1) ).toISOString().split('T')[0]);
    const [adults, setAdults] = useState(2);

    // Filter rooms based on guests and dates
    useEffect(() => {
        const filterRooms = () => {
            const filtered = rooms_all.filter(room => {
                // Check if room has enough capacity for the number of guests
                const hasCapacity = room.capacity >= adults;

                // Check if the room is available for the selected date range
                const isAvailable = (
                    (new Date(room.avail_check_in) <= new Date(checkInDate)) &&
                    (new Date(room.avail_check_out) >= new Date(checkOutDate))
                );

                return hasCapacity && isAvailable;
            });

            // Sort the filtered rooms by capacity (ascending)
            const sortedRooms = filtered.sort((a, b) => a.capacity - b.capacity);
            setFilteredRooms(sortedRooms);
        };

        filterRooms();
    }, [rooms_all, checkInDate, checkOutDate, adults]);
   

    // console.log('home-user?, ',user);
    // console.log('home-userData?, ',userData);

    console.log('rooms_all: ', rooms_all); 
    console.log('filtered_rooms: ', filteredRooms); 

    return ( 
        
        <div className="rooms-container">                    
            <section className="rooms-showcase">                    
                <div className="checkin-rectangle">
                    <div className="check-compare">
                        <button>COMPARE NOW</button>
                    </div>

                    <div className="date-picker-wrapper">
                        <label htmlFor="checkin" className="label">
                        Checkin Date
                        </label>
                        <input
                            type="date"
                            id="checkin"
                            name="checkin"
                            className="date-input"
                            aria-describedby="checkin-description"
                            value={ checkInDate }
                            onChange={(e)=> {
                                setCheckInDate(e.target.value);
                                const newCheckOutDate = new Date(e.target.value);
                                newCheckOutDate.setDate(newCheckOutDate.getDate() + 1);
                                setCheckOutDate(newCheckOutDate.toISOString().split('T')[0]);
                            }}
                            min={today} 
                        />                        
                    </div>

                    <div className="date-picker-wrapper">
                        <label htmlFor="checkout" className="label">
                        Checkout date
                        </label>
                        <input
                            type="date"
                            id="checkout"
                            name="checkout"
                            className="date-input"
                            aria-describedby="checkout-description"
                            value={ checkOutDate }
                            onChange={(e)=>{ setCheckOutDate(e.target.value);  }}
                        />                        
                    </div>

                    {/* <fieldset className="check-compare">
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
                    </fieldset> */}

                    <fieldset className="check-compare">
                        <select
                        id="guests"
                        name="guests"
                        value={adults}
                        onChange={(e)=>{ setAdults(e.target.value) }}
                        >
                        {[...Array(4).keys()].map((value) => (
                            <option key={value+1} value={value+1}>
                            Guests ({value+1})
                            </option>
                        ))}
                        </select>
                    </fieldset>               
                    
                </div>

                { page == "homepage" &&
                    <div className="rooms-showcase-title">
                        <small>Rest-Le-BnB</small> / 
                        <hr />
                        <RoomsList filteredRooms={filteredRooms}/>
                    </div> 
                }
            
            </section>
        </div>
        
     );
}
 
export default RoomShowcase;