import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const url = `http://localhost:8000/shoppingList`;

// Thunks for async operations
export const fetchShoppingList = createAsyncThunk(
  'shoppingList/fetchShoppingList',
  async (uid) => {
    const response = await axios.get(`${url}?uid=${uid}`);
    console.log('shopping-list', response);
    
    return response.data;
  }
);

export const addShoppingItem = createAsyncThunk(
  'shoppingList/addShoppingItem',
  async (item) => {
    const response = await axios.post(url, item);
    return response.data;
  }
);

export const deleteShoppingItem = createAsyncThunk(
  'shoppingList/deleteShoppingItem',
  async (id) => {
    await axios.delete(`${url}/${id}`);
    return id;
  }
);

export const editShoppingItem = createAsyncThunk(
  'shoppingList/editShoppingItem',
  async (item) => {
    console.log('edit_item.obj', item);
    
    const { id, shoppingItem, price, quantity, category, extraNotes} = item;
    const response = await axios.patch(`${url}/${id}`, { shoppingItem, price, quantity, category, extraNotes });
    return response.data;
  }
);

export const searchShoppingList = createAsyncThunk(
  'shoppingList/searchShoppingList',
  async (searchTerm) => {

    let search_item = searchTerm.searchTerm;
    let uid = searchTerm.uid;

    const response = await axios.get(`${url}?uid=${uid}&shoppingItem=${search_item}`);
    console.log('search_item.obj', searchTerm, ' res',response);   
    
    return response.data;
  }
);

// Slice
const shoppingListSlice = createSlice({
  name: 'shoppingList',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetchShoppingList
      .addCase(fetchShoppingList.fulfilled, (state, action) => {
        return action.payload;
      })
      // Handle addShoppingItem
      .addCase(addShoppingItem.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      // Handle deleteShoppingItem
      .addCase(deleteShoppingItem.fulfilled, (state, action) => {
        return state.filter(item => item.id !== action.payload);
      })
      // Handle editShoppingItem
      .addCase(editShoppingItem.fulfilled, (state, action) => {
        const index = state.findIndex(item => item.id === action.payload.id);
        if (index !== -1) { state[index] = action.payload; }
      })
      // Handle searchShoppingItems
      .addCase(searchShoppingList.fulfilled, (state, action) => {
        return action.payload;
      });
  }
});

export default shoppingListSlice.reducer;




