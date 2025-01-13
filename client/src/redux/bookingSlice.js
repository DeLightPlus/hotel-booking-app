import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, query, where, getDocs, doc, setDoc, updateDoc, serverTimestamp, arrayUnion } from 'firebase/firestore';
import { db } from '../config/firebase';


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



export const createBooking = createAsyncThunk(
  'bookings/createBooking',
  async ({ bookingDetails }, { rejectWithValue }) => {
    try 
    {
      const userBookingsRef = collection(db, 'users', bookingDetails.userId, 'bookings');
      const q = query(userBookingsRef, where("status", "==", "active"));

      const querySnapshot = await getDocs(q);
      const activeBookings = querySnapshot.docs.length;

      // Check if the user already has 2 active bookings
      if (activeBookings >= 2) 
      {
        return rejectWithValue('You can only have 2 active bookings at a time.');
      }

      // If the user has less than 2 active bookings, proceed to create a new booking
      const newBooking = {
        roomId: bookingDetails.roomId,
        checkInDate: bookingDetails.checkInDate,
        checkOutDate: bookingDetails.checkOutDate,
        status: "active",  // The status is "active" when the booking is in progress
        bookingDate: bookingDetails.paymentDetails.update_time,
      };

      // Create new booking for the user
      const newBookingRef = doc(userBookingsRef);
      await setDoc(newBookingRef, newBooking);

      return newBooking;
    }
    catch (error) 
    {
      console.error('Error creating booking: ', error);
      return rejectWithValue(error.message);
    }
  }
);

// Function to handle expired bookings and free up space
export const checkExpiredBookings = createAsyncThunk(
  'bookings/checkExpiredBookings',
  async (userId, { rejectWithValue }) => {
    try {
      const userBookingsRef = collection(db, 'users', userId, 'bookings');
      const q = query(userBookingsRef, where("status", "==", "active"));

      const querySnapshot = await getDocs(q);
      const now = new Date();
      
      // Check for expired bookings and update their status to "expired"
      querySnapshot.forEach(async (docSnap) => {
        const bookingData = docSnap.data();
        if (bookingData.checkOutDate.toDate() < now) {
          // If the booking's check-out date has passed, mark it as expired
          const bookingRef = doc(userBookingsRef, docSnap.id);
          await updateDoc(bookingRef, {
            status: 'expired',
          });
        }
      });
      
    } catch (error) {
      console.error('Error checking expired bookings: ', error);
      return rejectWithValue(error.message);
    }
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
