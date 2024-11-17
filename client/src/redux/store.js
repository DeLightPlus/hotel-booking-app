import { configureStore } from '@reduxjs/toolkit';  
import authReducer from './authSlice';
import roomReducer from './roomsSlice';
import bookingReducer from './bookingSlice';



export const store = configureStore ({
    reducer: { 
        auth: authReducer,
        rooms: roomReducer,
        bookings: bookingReducer
    },
});