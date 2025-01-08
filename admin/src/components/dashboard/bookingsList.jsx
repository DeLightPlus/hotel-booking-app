// import styles from './dashboard.module.css';

import { auth, db } from '../../config/firebase';
import { collection, onSnapshot, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { useDispatch, useSelector } from "react-redux";
import BookingSummary from "./bookingSummary";

const BookingList = () =>
{
    const user = useSelector((state) => state.auth.user); 
    const adminUserData = useSelector((state) => state.auth.adminUserData);   
    const rooms_all = useSelector((state) => state.rooms.rooms_all);
    
    // const [rooms, setRooms] = useState([]);
    // const [newRoom, setNewRoom] = useState({});
   

    return(       
        <div className='rooms-container'>
            {console.log('all-rooms', rooms_all)        }        

            <div className="available-rooms-container">            
                <div>Rooms 
                [<select>
                    <option value="all">All</option>
                    <option value="available">Available</option>
                    <option value="booked">Booked</option>
                </select>]</div>
                <div className={`rooms-ul ${adminUserData ? 'hv' : '' }`}> 
                {   
                    rooms_all.length == 0 ? <>Loading</> :             
                    rooms_all.map((room) => (  <BookingSummary key={room.id} room={room} /> ))   
                }
                </div>                       
                        
            </div>
        </div>
    )
}

export default BookingList;