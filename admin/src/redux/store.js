import { configureStore } from '@reduxjs/toolkit';  
import authReducer from './authSlice';
import roomReducer from './roomsSlice';



export const store = configureStore ({
    reducer: { 
        auth: authReducer,
        rooms: roomReducer
    },
});