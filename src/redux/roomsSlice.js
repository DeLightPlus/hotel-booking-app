// roomsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';

const initialState = {
  rooms_all: [],
  isLoading: false,
  error: null,
};

// Async thunk to fetch rooms from Firebase
export const fetchRooms = createAsyncThunk('rooms/fetchRooms', 
    async () => {
        const roomsCollection = collection(db, 'rooms');
        const snapshot = await getDocs(roomsCollection);  
        const rooms = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        console.log('redux_fb-rooms', rooms);
            
        return rooms;
});

const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    // Optional: If you want to create a setRooms action
    setRooms: (state, action) => {
      state.rooms_all = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRooms.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.rooms_all = action.payload;
        state.isLoading = false;
        state.error = null;
        setRooms(action.payload)
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.error = action.error.message; // Capture error message
        state.isLoading = false;
      });
  },
});

export const { setRooms } = roomsSlice.actions;
export default roomsSlice.reducer;
