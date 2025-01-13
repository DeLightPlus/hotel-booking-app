import { useEffect, useState } from "react";
import { auth, db } from '../../config/firebase';
import { collection, onSnapshot, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';

import { useDispatch, useSelector } from "react-redux";
import RoomSummary from "./RoomSummary";
import { useNavigate } from "react-router";


const RoomsList = ({filteredRooms}) =>
{ 
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state) => state.auth.user);
    const userData = useSelector((state) => state.auth.userData);   
   
    const rooms_all = useSelector((state) => state.rooms.rooms_all);
    
    // const [rooms, setRooms] = useState([]);
    // const [newRoom, setNewRoom] = useState({});   

    return(       
        <div>
            {console.log('all-rooms', rooms_all)        }
            {/* <>
            [
                <select style={{width:"127px"}}>
                    <option value="all">All ({rooms_all.length})</option>
                    <option value="available">Available</option>
                    <option value="booked">Booked</option>
                </select>
            ]
            </> */}

            <div className="available-rooms-container">           

                <div className={`rooms-ul ${userData ? 'hv' : '' }`}> 
                {   
                    filteredRooms.length == 0 ? <>Loading Rooms</> :             
                    filteredRooms.map((room) => ( <RoomSummary key={room.id} room={room} /> ))   
                }
                </div> 

                <button id="view" onClick={()=>{
                        navigate("/rooms")
                    }}
                > View More
                </button>
            </div>
            
              
        </div>
    )
}

export default RoomsList;