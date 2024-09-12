import '@mdi/font/css/materialdesignicons.min.css';

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


  return (
    <div className="home-page"> 
      <div className='container'>
        {
          !user &&
          <div className="getStarted">          
              <button className='getStarted-btn'
                onClick={()=> { navigate('/register')}}> Get Started
              </button> 
              <div>Already have an account? <br/><Link to={'/login'}>Signin</Link></div>
          </div>  
        }     
          
        <div className='search-group'>
          <select placeholder={``}>
            <option value="">Location</option>
          </select>          
          <input placeholder='Search' />
          
          <button>
            <i className="fas fa-search"/>
          </button>
        </div>
        
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
              <h3>Hotel Amenities</h3>
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
              <br/>
              <h3 className="headline">
                Experience the ultimate in luxury and comfort at our hotel and restaurant.
                <br className="hidden-break" />           
              </h3>

              <button>Show More</button>      
            </div>
          </div>        
        </div>

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
      </div>
      
      <div className="rooms-container">
          
      </div>
    </div>
  );
};

export default HomePage;
