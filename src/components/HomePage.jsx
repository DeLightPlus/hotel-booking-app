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

const HomePage = () => 
{
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signedIn = useSelector((state) => state.user.signedIn);
  const user = useSelector((state) => state.user);
  const shoppingList = useSelector((state) => state.shoppingList);
  
  const [editing, setEditing] = useState(null);
  const [editInput, setEditInput] = useState('');
  const [editPrice, setEditPrice] = useState(0); 
  const [editQuant, setEditQuant] = useState(1); 
  const [editCategory, setEditCategory] = useState(''); 
  const [editExtraNotes, setEditExtraNotes] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState(SORT_OPTIONS.NAME_ASC);
  const [categoryFilter, setCategoryFilter] = useState('');

  useEffect(() => {
    if (signedIn) {
      dispatch(fetchShoppingList(user.id));
    }
  }, [signedIn, user.id, dispatch]);

  useEffect(() => {
    // Console log for debugging
    console.log('shoppingList', shoppingList);
  }, [shoppingList]);

  const calculateTotalExpense = (shoppingList) => 
  {
    return shoppingList.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const totalExpense = calculateTotalExpense(shoppingList);

  const handleSearch = (event) => 
  {
    event.preventDefault();
    if (searchTerm && user) {
      dispatch(searchShoppingList({ searchTerm, uid: user.id }));
    }
  };

  const handleSort = (items) => {
    switch (sortOption) {
      case SORT_OPTIONS.NAME_ASC:
        return items.slice().sort((a, b) => a.shoppingItem.localeCompare(b.shoppingItem));
      case SORT_OPTIONS.NAME_DESC:
        return items.slice().sort((a, b) => b.shoppingItem.localeCompare(a.shoppingItem));
      case SORT_OPTIONS.PRICE_ASC:
        return items.slice().sort((a, b) => a.price - b.price);
      case SORT_OPTIONS.PRICE_DESC:
        return items.slice().sort((a, b) => b.price - a.price);
      case SORT_OPTIONS.QUANTITY_ASC:
        return items.slice().sort((a, b) => a.quantity - b.quantity);
      case SORT_OPTIONS.QUANTITY_DESC:
        return items.slice().sort((a, b) => b.quantity - a.quantity);
      default:
        return items;
    }
  };

  const filteredAndSortedItems = handleSort(
    shoppingList.filter(item => !categoryFilter || item.category === categoryFilter)
  );

  return (
    <div className='container'>
      <div className="getStarted" onSubmit={handleSearch}>          
          <button className='getStarted-btn'
            onClick={()=> { navigate('/register')}}> Get Started
          </button> 
          <div>Already have an account? <br/><Link to={'/signin'}>Signin</Link></div>
      </div>  
      
        
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
              <li>Wi-Fi</li>  
              <li>Pool</li>
              <li>Restaurant</li>
              <li>Bar</li>              
            </ul>
          </div>
          <div className="showcase">
           
          </div>
        </div>
      </div>

    </div>
  );
};

export default HomePage;
