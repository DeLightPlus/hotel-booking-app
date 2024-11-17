import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../config/firebase';
import { doc, setDoc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';

// Async action to fetch user bookings from Firestore
export const fetchUserBookings = createAsyncThunk(
  'bookings/fetchUserBookings',
  async (userId) => {
    const bookingsRef = doc(db, 'bookings', userId);
    const bookingsDoc = await getDoc(bookingsRef);

    if (bookingsDoc.exists()) 
    {
      console.log("myBookings", bookingsDoc.data().bookings);
      
      return bookingsDoc.data().bookings || [];  // Return an array of bookings if they exist
    } 
    else 
    {
      return [];
    }
  }
);

// Async action to create a new booking
export const createBooking = createAsyncThunk(
  'bookings/createBooking',
  async ({ userId, bookingDetails }) => {
    const userBookingsRef = doc(db, 'bookings', userId);

    // If the user already has a booking document, update it, else create a new one
    const userBookingsDoc = await getDoc(userBookingsRef);
    if (userBookingsDoc.exists()) {
      await updateDoc(userBookingsRef, {
        bookings: arrayUnion(bookingDetails),  // Add the new booking to the user's bookings array
      });
    } else {
      // If no booking document exists for the user, create a new one with the booking
      await setDoc(userBookingsRef, {
        bookings: [bookingDetails],
      });
    }

    return bookingDetails;  // Return the newly created booking
  }
);

const initialState = {
  userBookings: [],
  loading: false,
  error: null,
};

const bookingSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    setUserBookings: (state, action) => {
      state.userBookings = action.payload;
    },
    clearUserBookings: (state) => {
      state.userBookings = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.userBookings = action.payload;
      })
      .addCase(fetchUserBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.userBookings.push(action.payload);  // Add the new booking to the state
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setUserBookings, clearUserBookings } = bookingSlice.actions;

export default bookingSlice.reducer;
