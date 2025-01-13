import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

const initialState = {
  rooms_all: [],
  isLoading: false,
  error: null,
};

// Async thunk to fetch rooms from Firebase
export const fetchRooms = createAsyncThunk('rooms/fetchRooms', async () => {
  const roomsCollection = collection(db, 'rooms');
  const snapshot = await getDocs(roomsCollection);
  const rooms = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  console.log('redux_fb-rooms', rooms);
  return rooms;
});

// Async thunk to update room availability after booking
export const updateRoomAfterBooking = createAsyncThunk(
  'rooms/updateRoomAfterBooking',
  async ({ roomId, bookingDetails }, { rejectWithValue }) => {
    try {
      console.log("booking details: ", bookingDetails);
      
      const roomRef = doc(db, 'rooms', roomId);
      const { checkInDate, checkOutDate, numberOfNights } = bookingDetails;


      // Convert checkInDate to Date object
      const checkIn = new Date(checkOutDate);
      const checkOut = new Date(checkIn);

      // Calculate checkOutDate by adding numberOfNights to checkInDate
      checkOut.setDate(checkIn.getDate() + numberOfNights);

      // Format the check-in and check-out dates as "YYYY-MM-DD"
      const formattedCheckInDate = checkIn.toISOString().split('T')[0];
      const formattedCheckOutDate = checkOut.toISOString().split('T')[0];

      // Prepare the updated room data
      const updatedRoomData = {
        avail_check_in: formattedCheckInDate,  // Set check-in date to the booking's check-in date
        avail_check_out: formattedCheckOutDate, // Set check-out date to the calculated check-out date
        avail_night: numberOfNights,  // Adjust available nights based on booked nights
        available: false, // Mark the room as unavailable during the booking period
      };

      // Update the room document in Firestore for the booking
      await updateDoc(roomRef, updatedRoomData);
      console.log('Room details updated successfully!');
      
      return { roomId, updatedRoomData };  // Return data for state update
    } 
    catch (error) 
    {
      console.error('Error updating room details: ', error);
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to update availability of all rooms that are available
export const updateAllRoomsAvailabilityDaily = createAsyncThunk(
  'rooms/updateAllRoomsAvailabilityDaily',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const availableRooms = state.rooms.rooms_all.filter(room => room.available);

      // Get today's date in YYYY-MM-DD format
      const currentDate = new Date().toISOString().split('T')[0];       
      
      // Prepare an array of update promises
      const updatePromises = availableRooms.map((room) => {
        const roomRef = doc(db, 'rooms', room.id);
        const expectedCheckoutDate = new Date(currentDate); 
      
        expectedCheckoutDate.setDate(expectedCheckoutDate.getDate() + room.avail_night);
        // console.log(expectedCheckoutDate);

        // Update the room document to set avail_check_in to today's date
        const updatedRoomData = {
          avail_check_in: currentDate,
          avail_check_out: expectedCheckoutDate.toISOString().split('T')[0],
          available: true, // Keep the room available for future bookings
        };

        return updateDoc(roomRef, updatedRoomData); // Return the promise to be resolved
      });

      // Execute all updates in parallel
      await Promise.all(updatePromises);

      console.log('All available rooms have been updated with today\'s availability.');

    } catch (error) {
      console.error('Error updating available rooms: ', error);
      return rejectWithValue(error.message);
    }
  }
);

const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    setRooms: (state, action) => {
      state.rooms_all = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetching rooms
      .addCase(fetchRooms.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.rooms_all = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })
      
      // Handle updating room availability after booking
      .addCase(updateRoomAfterBooking.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateRoomAfterBooking.fulfilled, (state, action) => {
        // Find the updated room in the state and update it
        const { roomId, updatedRoomData } = action.payload;
        const roomIndex = state.rooms_all.findIndex((room) => room.id === roomId);
        if (roomIndex !== -1) {
          state.rooms_all[roomIndex] = { ...state.rooms_all[roomIndex], ...updatedRoomData };
        }
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updateRoomAfterBooking.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
        state.isLoading = false;
      })

      // Handle daily availability update
      .addCase(updateAllRoomsAvailabilityDaily.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAllRoomsAvailabilityDaily.fulfilled, (state) => {
        // After successful update, set rooms to available for the next day
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updateAllRoomsAvailabilityDaily.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
        state.isLoading = false;
      });
  },
});

export const { setRooms } = roomsSlice.actions;

export default roomsSlice.reducer;
