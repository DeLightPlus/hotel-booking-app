import '../index.css';


import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchShoppingList, deleteShoppingItem, editShoppingItem, searchShoppingList } from '../redux/shoppingListReducer';
import SearchItem from './searchItem';
import { Link, useNavigate } from 'react-router-dom';


// import { hotelPic1 } from '../assets/valeriia.jpg';

const SORT_OPTIONS = {
  NAME_ASC: 'Name (A-Z)',
  NAME_DESC: 'Name (Z-A)',
  PRICE_ASC: 'Price (Low to High)',
  PRICE_DESC: 'Price (High to Low)',
  QUANTITY_ASC: 'Quantity (Low to High)',
  QUANTITY_DESC: 'Quantity (High to Low)',
};

const HomePage = ({user}) => 
{
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const signedIn = useSelector((state) => state.user.signedIn);
  // const user = useSelector((state) => state.user);
  // const shoppingList = useSelector((state) => state.shoppingList);
  
  // const [editing, setEditing] = useState(null);
  // const [editInput, setEditInput] = useState('');
  // const [editPrice, setEditPrice] = useState(0); 
  // const [editQuant, setEditQuant] = useState(1); 
  // const [editCategory, setEditCategory] = useState(''); 
  // const [editExtraNotes, setEditExtraNotes] = useState('');
  // const [searchTerm, setSearchTerm] = useState('');
  // const [sortOption, setSortOption] = useState(SORT_OPTIONS.NAME_ASC);
  // const [categoryFilter, setCategoryFilter] = useState('');

  // useEffect(() => {
  //   if (signedIn) {
  //     dispatch(fetchShoppingList(user.id));
  //   }
  // }, [signedIn, user.id, dispatch]);

  // useEffect(() => {
  //   // Console log for debugging
  //   console.log('shoppingList', shoppingList);
  // }, []);

  // const handleSearch = (event) => 
  // {
  //   event.preventDefault();
  //   if (searchTerm && user) {
  //     dispatch(searchShoppingList({ searchTerm, uid: user.id }));
  //   }
  // };

  const handleBookingModal = () =>
  {
    navigate('/booking');
  }


  return (
    <div className="home-page"> 
      <div className='grid-container'>
        {
          !user &&
          <div className="getStarted">          
              <button className='getStarted-btn'
                onClick={()=> { navigate('/register')}}> Get Started
              </button> 
              <div><small>Already have an account? </small><br/><Link to={'/login'}>Signin</Link></div>
          </div>  
        }  
        
        <div className="socials-btn-group">
          <button>
            <i className="fab fa-facebook-f" /> 
          </button>

          <button>
            <i className="fab fa-twitter" />
          </button>

          <button>
            <i className="fab fa-linkedin-in" />
          </button>
        </div>     

        <div className='showcase-container'>
          <h2>Enjoy and unwind at your luxurious vacation hotel.</h2>
          <p>
            Elevating outstanding hotels to unparalleled excellence & extraordinary levels.
          </p>
          <hr></hr>
          <div className='showcase-h-group'>
            <div className="amenities">
              <h3>Hotel Amenities</h3><hr/>
              <ul>
                <li><i class="fa fa-wifi"/> 
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

                <li><i class="fa fa-utensils"/>
                  Restaurant On Site
                  <i className='far fa-check-circle'/>
                </li>

                <li><i class="fa fa-cocktail"/>
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

            <div className="showcase">
              <p><i class="fa fa-map-pin"/> 
                 {'  '}South Africa, 
                <small> ... show locations</small>
                </p>
              <strong className="headline">
                Experience the ultimate in luxury and comfort at our hotel and restaurant.          
              </strong>
              
              ----<button>Show More</button>----      
            </div>
          </div>        
        </div>       

        <div className="rooms-container">
          
          <div className="rooms-showcase">
            <div className='checkin-rectangle'>
              <div className="check-compare">
                <input type="date" /><br/>
                Check-In
              </div>

              <div className="check-compare">
                <input type="date" /><br/>
                Check-Out
              </div>

              <div className="check-compare">
                <select>
                  <option value="0">KIDS (0)</option>
                  <option value="1">KIDS (1)</option>
                  <option value="2">KIDS (2)</option>
                  <option value="3">KIDS (3)</option>
                  <option value="4">KIDS (4)</option>
                </select>
                {/* Kids(0) */}
              </div>

              <div className="check-compare">
                <select>
                    <option value="0">ADULTS (0)</option>
                    <option value="1">ADULTS (1)</option>
                    <option value="2">ADULTS (2)</option>
                    <option value="3">ADULTS (3)</option>
                    <option value="4">ADULTS (4)</option>
                  </select>
                  {/* Adults(0) */}
              </div>

              <div className="check-compare">
                <button>COMPARE NOW</button>
              </div>
            </div>
            <div className="rooms-showcase-title">
              <small>Rest-Le-BnB</small> | Available Rooms ( 8 )
              <hr/>              
            </div>
            <div className="available-rooms-container">            

              <div className="rooms-ul">  

                <div className="rooms-li">
                  <div className="grid-li-body">
                    <img src="https://cdn.pixabay.com/photo/2016/10/18/09/02/hotel-1749602_960_720.jpg"/>

                    {/* <div className="box">&hearts;</div> */}
                  </div>

                  <div className='bottom-section' onClick={handleBookingModal}>
                    <p>Tiny Home of Linden <small>⭐ 4.86 (218)</small></p>
                    <small>4 guests • 2 bedrooms • 2 beds •  1 bathroom </small>
                    <p><i>R1800</i> | <strong>R1000 night</strong> • <small>3600 total</small> </p>
                    <span>Show More Details</span>
                  </div>                  
                </div>

                <div className="rooms-li">
                  <div className="grid-li-body">
                    <img src="https://thelivingjourneycollection.co.za/wp-content/uploads/2022/09/Rectangle-120@2x.jpg"/>

                    {/* <div className="box">&hearts;</div> */}
                  </div>

                  <div className='bottom-section'>
                    <p>The Secret Garden Suite <small>⭐ 4.86 (218)</small></p>
                    <small>2 guests • 1 bedrooms • 1 beds •  1 bathroom </small>
                    <p><i>R1800</i> | <strong>R1000 night</strong> • <small>3600 total</small> </p>
                    <span>Show More Details</span>
                  </div>                  
                </div>

                <div className="rooms-li">
                  <div className="grid-li-body">
                    <img src="https://pix8.agoda.net/hotelImages/146267/813381930/ea9801c79dce663d418a57855365b8f7.jpg?ce=0&s=1024x768"/>

                    {/* <div className="box">&hearts;</div> */}
                  </div>

                  <div className='bottom-section'>
                    <p>The Lookout Delux Suite <small>⭐ 4.86 (218)</small></p>
                    <small>2 guests • 1 bedrooms • 1 beds •  1 bathroom </small>
                    <p><i>R1800</i> | <strong>R1000 night</strong> • <small>3600 total</small> </p>
                    <span>Show More Details</span>
                  </div>                  
                </div>

                <div className="rooms-li">
                  <div className="grid-li-body">
                    <img src="https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/823033/823033/b51acdc4-287b-4d55-b81a-88163e801a74.jpg?auto=format,compress&fit=crop&crop=entropy&w=1872&q=75"/>

                    {/* <div className="box">&hearts;</div> */}
                  </div>

                  <div className='bottom-section'>
                    <p>The Villa leView Suite <small>⭐ 4.86 (218)</small></p>
                    <small>2 guests • 1 bedrooms • 1 beds •  1 bathroom </small>
                    <p><i>R1800</i> | <strong>R1000 night</strong> • <small>3600 total</small> </p>
                    <span>Show More Details</span>
                  </div>                  
                </div>

                <div className="rooms-li">
                  <div className="grid-li-body">
                    <img src="https://q-xx.bstatic.com/xdata/images/hotel/840x460/424239879.jpg?k=2ab5f9714ab19458093206728eda63b8d46c83ac69d9dedaca8c07bc29e998af&o="/>

                    {/* <div className="box">&hearts;</div> */}
                  </div>

                  <div className='bottom-section'>
                    <p>The Standard Double <small>⭐ 4.86 (218)</small></p>
                    <small>4 guests • 1 bedrooms • 2 beds •  1 bathroom </small>
                    <p><i>R1800</i> | <strong>R1000 night</strong> • <small>3600 total</small> </p>
                    <span>Show More Details</span>
                  </div>                  
                </div>

                <div className="rooms-li">
                  <div className="grid-li-body">
                    <img src="https://z.cdrst.com/foto/hotel-sf/74da8/medianaresp/afrique-boutique-hotel-o-r-tambo-habitacion-bd6725b.jpg"/>

                    {/* <div className="box">&hearts;</div> */}
                  </div>

                  <div className='bottom-section'>
                    <p>The Superior Double <small>⭐ 4.86 (218)</small></p>
                    <small>2 guests • 1 bedrooms • 1 beds •  1 bathroom </small>
                    <p><i>R1800</i> | <strong>R1000 night</strong> • <small>3600 total</small> </p>
                    <span>Show More Details</span>
                  </div>                  
                </div>

                <div className="rooms-li">
                  <div className="grid-li-body">
                    <img src="https://pix2.agoda.net/hotelimages/142/1423250/1423250_17011315010050301637.jpg"/>

                    {/* <div className="box">&hearts;</div> */}
                  </div>

                  <div className='bottom-section'>
                    <p>InnsCape on Castle Suite <small>⭐ 4.86 (218)</small></p>
                    <small>2 guests • 1 bedrooms • 1 beds •  1 bathroom </small>
                    <p><i>R1800</i> | <strong>R1000 night</strong> • <small>3600 total</small> </p>
                    <span>Show More Details</span>
                  </div>                  
                </div>

                <div className="rooms-li">
                  <div className="grid-li-body">
                    <img src="https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/823033/823033/b51acdc4-287b-4d55-b81a-88163e801a74.jpg?auto=format,compress&fit=crop&crop=entropy&w=1872&q=75"/>

                    {/* <div className="box">&hearts;</div> */}
                  </div>

                  <div className='bottom-section'>
                    <p>The Lookout Suite <small>⭐ 4.86 (218)</small></p>
                    <small>2 guests • 1 bedrooms • 1 beds •  1 bathroom </small>
                    <p><i>R1800</i> | <strong>R1000 night</strong> • <small>3600 total</small> </p>
                    <span>Show More Details</span>
                  </div>                  
                </div>

                <div className="rooms-li">
                  <div className="grid-li-body">
                    <img src="https://i.imgur.com/8Q6zZ8B.jpg"/>
                    {/* <div className="box">&hearts;</div> */}
                  </div>

                  <div className='bottom-section'>
                    <p>a</p>
                  </div>                  
                </div>

                <div className="rooms-li">
                  <div className="grid-li-body">
                    <img src="https://i.imgur.com/8Q6zZ8B.jpg"/>
                    {/* <div className="box">&hearts;</div> */}
                  </div>

                  <div className='bottom-section'>
                    <p>a</p>
                  </div>                  
                </div>

                <div className="rooms-li">
                  <div className="grid-li-body">
                    <img src="https://i.imgur.com/8Q6zZ8B.jpg"/>
                    {/* <div className="box">&hearts;</div> */}
                  </div>

                  <div className='bottom-section'>
                    <p>a</p>
                  </div>                  
                </div>
                
              </div>                        
                        
            </div>
            
          </div>     

        </div>

        <div className="restaurant-showcase">            
            <div className="restaurant-showcase-title">
              <small>Rest-Le-BnB</small> | Restaurent
              <hr/>              
            </div>
            <div className="grid-content">
              {/* <div className="grid-item item1">
                <p>
                  Hotel, nestled in the vibrant and trendy Green Point neighborhood,
                  offers a unique retreat in Cape Town.
                  Just a short walk from iconic spots like the V&A Waterfront,
                  Bo-Kaap, Cape Quarter, Cape Town Stadium, and the Central Business District,
                  it provides a prime location for exploring the city's best attractions.
                </p>   

                <p>
                  Surrounded by lush trees, the hotel lives up to its name with stunning panoramic views.
                  Its design eschews mainstream trends in favor of creating a space that celebrates local creativity and color. 
                  The hotel's understated and minimalist design elements are thoughtfully blended with natural inspiration,
                  offering guests a serene escape that feels both refreshing and deeply connected to nature.
                </p> 

                <p>
                  Overall, The Tree House Boutique Hotel promises a distinctive and memorable experience, allowing guests to unwind and marvel at the natural beauty of Cape Town while enjoying a unique, artistic environment.
                </p>
              </div> */}

              <div class="grid-item item1">Item 1</div>
              <div class="grid-item item2">Item 2</div>
              <div class="grid-item item3">Item 3</div>


            
            </div>
            
          </div>
      </div>

      
      
      
    </div>
  );
};

export default HomePage;
