import '../App.css';

import AddShoppingItem from './addShoppingItem';
import HomePage from './HomePage';
import ShoppingList from './HomePage';

import { useEffect, useState } from 'react';


function Dashboard() 
{
    const [showWelcome, setShowWelcome] = useState(true);

    useEffect(() => {
    const timeoutId = setTimeout(() => { setShowWelcome(false);
        }, 10000);

        return () => clearTimeout(timeoutId);
    }, []);


  return (
    <>        
        <HomePage/>
        { showWelcome && <h1>Welcome to Rest-Le-BnB!</h1> }
        <AddShoppingItem /> 
        
    </>
  );
}

export default Dashboard;