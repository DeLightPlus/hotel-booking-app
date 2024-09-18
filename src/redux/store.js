import { configureStore } from "@reduxjs/toolkit";
import bookingSlice from  './bookingRequestsReducer';
import { userSlice } from "./userSlice";

export const store = configureStore ({
    reducer: { 
        user: userSlice.reducer,
        bookingsList: bookingSlice,
    }
})