import { useEffect, useState } from "react";
import { auth, db } from '../../config/firebase';
import { collection, onSnapshot, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';

import BookingSummary from "./bookingSummary";
import { useDispatch, useSelector } from "react-redux";


const BookingList = () =>
{
    const user = useSelector((state) => state.auth.user);
    const userData = useSelector((state) => state.auth.userData); 
    const adminUserData = useSelector((state) => state.auth.adminUserData);

    const dispatch = useDispatch();
    const rooms_all = useSelector((state) => state.rooms.rooms_all);
    
    // const [rooms, setRooms] = useState([]);
    // const [newRoom, setNewRoom] = useState({});
   

    return(       
        <div>
            {console.log('all-rooms', rooms_all)        }
            <>Rooms 
            [<select>
                <option value="all">All</option>
                <option value="available">Available</option>
                <option value="booked">Booked</option>
             </select>]</>

            <div className="available-rooms-container">            

                <div className={`rooms-ul ${adminUserData ? 'hv' : '' }`}> 
                {   
                    rooms_all.length == 0 ? <>Loading</> :             
                    rooms_all.map((room) => (  <BookingSummary room={room} /> ))   
                }
                </div>                       
                        
            </div>
        </div>
    )
}

export default BookingList;