import { useState } from "react";
import { useSelector } from "react-redux";

const BookingSummary = ({room}) =>
{
    const user = useSelector((state) => state.auth.user);
    const userData = useSelector((state) => state.auth.userData); 
    const adminUserData = useSelector((state) => state.auth.adminUserData);

    const [newRoom, setNewRoom] = useState({}); 

    const handleSubmit = (room) => 
    {
            if (room.id) 
            {
                // Update room
                const roomRef = doc(db, 'rooms', room.id);
                updateDoc(roomRef, room);
            }
            else 
            {
                // Add new room
                const roomsCollection = collection(db, 'rooms');
                addDoc(roomsCollection, room);
            }
        };
    
        const handleDelete = (roomId) => {
            const roomRef = doc(db, 'rooms', roomId);
            deleteDoc(roomRef);
    };

    return (
        <>
            <div className="rooms-li" key={room.id}>
                <div className="grid-li-body">
                    <img src={room.image}/>                    
                </div>

                <div className='bottom-section'>
                    <p>{room.room_name}<small> ⭐ {room.rating}</small></p>
                        <small>{room.capacity} guests • {room.room_description} </small>
                        <p><i>R1800</i> | <strong>R{room.price} night</strong> • <small>{room.price * room.avail_night} total</small> </p>
                        <span>
                        {
                            adminUserData && (
                            <div>
                            {room.id && (
                                <div>
                                <button onClick={() => setNewRoom(room)}>Edit</button>
                                <button onClick={() => handleDelete(room.id)}>Delete</button>
                                </div>
                            )}
                            </div>
                        )}
                        
                           
                         BOOK NOW
                        </span>
                </div>
                
                
                
                {/* <button onClick={() => handleDelete(room.id)}>Delete</button>
                <button onClick={() => setNewRoom(room)}>Edit</button> */}
                            

            </div>
        </>
    )
}

export default BookingSummary