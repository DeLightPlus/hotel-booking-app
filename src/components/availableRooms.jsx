import React, { useState, useEffect } from 'react';

const AvailableRooms = () => {
  const [rooms, setRooms] = useState(
    [
        {
            id: 1,
            room_name: 'Tiny Home of Linden',
            room_description: '2 bedrooms • 2 beds •  1 bathroom',
            capacity: 4,
            price: 1400,   
            availability: '19/09/2024 - 22/09/2024',
            avail_night: 3,
            status: 'Available',
            rating: '4.5 (218)',
            image: ['https://cdn.pixabay.com/photo/2016/10/18/09/02/hotel-1749602_960_720.jpg',
                    'https://picsum.photos/200/300']
        },
        {
            id: 2,
            room_name: 'The Secret Garden Suite',
            room_description: '1 bedroom • 1 bed •  1 bathroom',
            capacity: 2,
            price: 900,   
            availability: '19/09/2024 - 22/09/2024',
            avail_night: 3,
            status: 'Available',
            rating: '4.5 (218)',
            image: [
                    'https://thelivingjourneycollection.co.za/wp-content/uploads/2022/09/Rectangle-120@2x.jpg',
                    'https://picsum.photos/200/300']
        }

    ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/available-rooms');
        const data = await response.json();
        setRooms(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    // fetchRooms();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Available Rooms</h2>

      <div className="available-rooms-container">            

        <div className="rooms-ul"> 
        {   
            rooms.length == 0 ? <>Loading</> :
            rooms.map((room) => (          
                // {room.name} ({room.capacity} guests)
                <div className="rooms-li" key={room.id}>
                    <div className="grid-li-body">
                    <img src={room.image[0]}/>

                    {/* <div className="box">&hearts;</div> */}
                    </div>

                    <div className='bottom-section'>
                    <p>{room.room_name}<small> ⭐ {room.rating}</small></p>
                    <small>{room.capacity} guests • {room.room_description} </small>
                    <p><i>R1800</i> | <strong>R{room.price} night</strong> • <small>{room.price * room.avail_night} total</small> </p>
                    <span>Show More Details</span>
                    </div>

                </div>            
            ))
        }
        </div>                        
                
      </div>

    </div>
  );
};

export default AvailableRooms;