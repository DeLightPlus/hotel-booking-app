

const BookingSummary = ({ room }) => 
{
  return (
    <div className="rooms-li">
      <div className="grid-li-body">
        <img src={room.image} alt={room.room_name} />                    
      </div>

      <div className="bottom-section">
        <p>{room.room_name}<small> ⭐{room.rating}</small></p>
        <span>{room.capacity} guests • {room.room_description}</span>
        <p>
          <small><i>R1800</i></small>  <strong>R{room.price} per night</strong>
          <button onClick={()=> setShowModal(true)}>REVIEW NOW</button>
        </p>
      </div>
    </div>
  );
};

export default BookingSummary;
