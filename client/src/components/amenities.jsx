const Amenities = () => {
    return ( 
        <div className="amenities">
              <h3>Hotel Amenities</h3><hr/>
              <ul>
                <li><i className="fa fa-wifi"/> 
                  Free Wi-Fi
                  <i className='far fa-check-circle'/>
                </li>

                <li><i className="fa fa-coffee" /> 
                  Free Breakfast 
                  <i className='far fa-check-circle'/>
                </li>

                <li><i className="fa fa-parking" /> 
                  Free Parking
                  <i className='far fa-check-circle'/>
                </li>

                <li><i className="fa fa-utensils"/>
                  Restaurant On Site
                  <i className='far fa-check-circle'/>
                </li>

                <li><i className="fa fa-cocktail"/>
                  MiniBar Lounge
                  <i className='far fa-check-circle'/>
                </li>              

                <li><i className="mdi mdi-pool" /> 
                  Swimming Pool
                  <i className='far fa-check-circle'/>
                </li> 

                <li><i className="fa fa-dumbbell" /> 
                  Gym Room
                  <i className='far fa-check-circle'/>
                </li>

                <li><i className="fa fa-smoking"/>
                    Smoking Room
                    <i className='fa fa-ban'/>
                </li> 

                <li><i className="fa fa-hands-wash"/>
                    Laundry Service 
                    <i className='fa fa-ban'/>
                </li>  

                <li><i className="fa fa-concierge-bell"/> 
                    Room Service 
                    <i className='fa fa-ban'/>
                </li>     

                <li><i className="fa fa-child"/> 
                    Child Section 
                    <i className='fa fa-ban'/>
                </li>    

                <li><i className="fas fa-users"/> 
                    Meetings 
                    <i className='fa fa-ban'/>
                </li>           
              </ul>
            </div>

     );
}
 
export default Amenities;