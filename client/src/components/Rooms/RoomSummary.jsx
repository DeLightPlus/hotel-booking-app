import { useDispatch, useSelector } from 'react-redux';
import { createBooking, fetchUserBookings } from '../../redux/bookingSlice';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import RoomBookingModal from './Room Booking Modal/RoomBookingModal';


const RoomSummary = ({ room }) => 
{
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const userBookings = useSelector((state) => state.bookings.userBookings);

  const [showModal, setShowModal] = useState(false); 

  useEffect(() => {
    if (user) 
    { 
        console.log(user);        
        dispatch(fetchUserBookings(user.uid));  // Fetch user bookings when the component is mounted
    }
  }, [dispatch, user]);

  const handleBookNow = () => {
    if (user) 
    {
      const bookingDetails = {
        bookingId: Date.now(),  // Unique ID for the booking
        roomId: room.id,
        userId: user.uid,
        userName: user.email,
        roomName: room.room_name,
        price: room.price,
        checkInDate: '2024-12-01', 
        checkOutDate: '2024-12-10',
        guests: 2,  // Example, you can dynamically calculate based on user input
      };

      // Dispatch the booking action to save it under the user's booking list
      dispatch(createBooking({ userId: user.uid, bookingDetails }));
      alert('Your booking has been confirmed!');
    } else {
      alert('Please log in to make a booking');
    }
  };

  return (
    <div className="rooms-li">
      <div className="grid-li-body">
        <img src={room.image} alt={room.room_name} />                    
      </div>

      <div className="bottom-section">
        <p>{room.room_name}<small> ⭐{room.rating}</small></p>
        <span>{room.capacity} guests • {room.room_description}</span>
        <div>
          <small><i>R1800</i></small>  <strong>R{room.price} per night</strong>
          <button onClick={()=> setShowModal(true)}>BOOK NOW</button>

          { showModal && <RoomBookingModal room={room} setShowModal={setShowModal}/>}
        </div>
      </div>
    </div>
  );
};

export default RoomSummary;
