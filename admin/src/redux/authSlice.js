import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';  
import { auth, db } from '../config/firebase';
import { setDoc, getDoc, doc } from 'firebase/firestore';
import { omit } from 'lodash';

import {
  createUserWithEmailAndPassword, 
  sendEmailVerification,
  signInWithEmailAndPassword, 
  signOut 
} from 'firebase/auth';

// Helper function to serialize user data for the admin panel
const serializeUser = (user) => {
    return {
      uid: user.uid,
      email: user.email,
    };
};

// Helper function to serialize admin data (from Firestore)
const serializeAdminData = (adminData) => {
    return {
      firstname: adminData.firstname,
      lastname: adminData.lastname,
      email: adminData.email,
      role: adminData.role,      
    };
};

const saveUserDataToFirestore = async (user) => {
  // Ensure you are using the `uid` as the Firestore document ID
  const userRef = doc(db, 'users', user.uid);
  await setDoc(userRef, {
    email: user.email,
    firstname: 'John',
    lastname: 'Doe',
    role: 'admin',  // Example: Admin role
  });
};

// Admin registration (Only admins can be registered)
export const registerAdmin = createAsyncThunk('auth/registerAdmin', 
  async ({ firstname, lastname, email, password }) => {  
    try 
    {   
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;  
      console.log('Admin registered:', user, ', names: ', firstname, ' ', lastname );

      // Check if the user document already exists in Firestore
      const userDocRef = doc(db, "users", user.uid);  // Firestore document reference for the admin
      const userDoc = await getDoc(userDocRef);
      
      if (!userDoc.exists()) 
      {  
        // await sendEmailVerification(user); // Send email verification to the admin
        
        await setDoc(userDocRef, {
          email: user.email,
          firstname: firstname,
          lastname: lastname,
          photoURL: "",
          role: 'admin' // Explicitly setting the user role to 'admin'
        });  
      }   
      else{ console.log('Admin data already exists in Firestore'); }     
    } 
    catch (error) 
    { 
      alert(error.message); 
      throw error;
    }
  }
);  

// Admin login logic
export const loginAdmin = createAsyncThunk('auth/loginAdmin', 
  async ({ email, password }) => {
    try 
    {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("userId:", user.uid);
      
      const adminData = await getAdminDataFromFirestore(user); 
      console.log('login_adminData, ', adminData);
      
      // Check if the user has admin rights
      if (adminData.role === 'admin') 
      {
        alert(`Hi Admin: ${user.email}`);
        return { user: serializeUser(user), adminData: serializeAdminData(adminData) };
      } 
      else 
      {
        throw new Error('Access denied. You are not an admin.');
      }
    } 
    catch (error) 
    {
      console.error(error.message);
      throw error;
    }
  }, { 
    serialize: (payload) => omit(payload, ['proactiveRefresh']) 
  }
);

// Admin logout logic
export const logoutAdmin = createAsyncThunk('auth/logoutAdmin', 
  async () => {  
    await signOut(auth); 
    console.log("You've signed out!"); 
  }
);

// Fetch admin data from Firestore (check if user is an admin)
export const getAdminDataFromFirestore = async (user) => {
  const adminRef = doc(db, "users", user.uid);  // Look in the "admins" collection
  const adminData = await getDoc(adminRef);

  if (adminData.exists()) {
    const adminDataFromFirestore = adminData.data();

    if (user.emailVerified) 
    {
      console.log('adminDataFS', adminDataFromFirestore);
    } 
    else 
    { 
      console.log('Please verify your email address to continue'); 
    }

    return { ...adminDataFromFirestore };

  } else {
    console.log('No admin data found for this user');
    throw new Error('No admin data found');
  }
};

// Initial state for auth slice
const initialState = {
  user: null,
  adminData: null,
  loading: false,
  error: null,
};

// Auth slice for handling authentication states
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAdmin: (state, action) => {
      // console.log(action.payload);      
      state.user = action.payload.user;
      state.adminData = action.payload.adminData;
    },

    clearAdmin: (state) => {
      state.user = null;
      state.adminData = null;
    },
  },  
  extraReducers: (builder) => {  
    builder  
      .addCase(registerAdmin.pending, (state) => {  
        state.loading = true;  
        state.error = null;  
      })  
      .addCase(registerAdmin.fulfilled, (state, action) => {  
        state.loading = false;  
        state.user = action.payload;                 
      })  
      .addCase(registerAdmin.rejected, (state, action) => {  
        state.loading = false;  
        state.error = action.error.message;  
      }) 

      .addCase(loginAdmin.pending, (state) => {  
        state.loading = true;  
        state.error = null;  
      })  
      .addCase(loginAdmin.fulfilled, (state, action) => {  
        state.error = null;
        state.loading = false;  
        state.user = action.payload.user;  
        state.adminData = action.payload.adminData;
      })  
      .addCase(loginAdmin.rejected, (state, action) => {  
        state.loading = false;  
        state.error = action.error.message;  
      })
      
      .addCase(logoutAdmin.fulfilled, (state) => {  
        state.user = null;  
        state.adminData = null;
      });  
  },  
}); 

export const { setAdmin, clearAdmin } = authSlice.actions;
export default authSlice.reducer;
