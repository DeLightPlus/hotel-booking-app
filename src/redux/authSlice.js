import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';  

// import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore'; 
import { auth, db } from '../config/firebase';
import { setDoc, getDoc,  doc } from 'firebase/firestore';

import { omit } from 'lodash';

import {
  createUserWithEmailAndPassword, 
  onAuthStateChanged, 
  sendEmailVerification,
  signInWithEmailAndPassword, 
  signOut } from 'firebase/auth';  


const serializeUser = (user) => {
    return {
      uid: user.uid,
      email: user.email,
      // emailVerified: user.emailVerified,
      // Add other relevant properties here
    };
  };

const serializeUserData = (userData) => {
    return {
      firstname: userData.firstname,
      lastname: userData.lastname,
      email: userData.email,
      role: userData.role,      
    };
};


export const registerUser = createAsyncThunk('auth/registerUser', 
  async ({firstname, lastname, email, password }) => {  
    try
    {   
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;  
      console.log(user, ', names: ', firstname, ' ', lastname );
      if(user)
      {  
        await sendEmailVerification(user)
        const docRef = doc(db, "users", user.uid);
        await setDoc(docRef,
            {
              email: user.email,
              firstname: firstname,
              lastname: lastname,
              role: 'user'
            });

        alert('Check your email for verification');        
        return user;    
      }        
    }
    catch (error) { alert( error.message ); throw error; }
    
});  

export const loginUser = createAsyncThunk('auth/loginUser', 
  async ({ email, password }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userData = await getUserDataFromFirestore(user); 
      console.log('login_userData, ', userData);
      
      if(userData.role === 'admin')
      {
        alert('Hi Admin: ', user.email);
        
        return { user: serializeUser(user), 
          userData: null, adminUserData: serializeUserData(user) };
      }
      else if(userData.role === 'user')
      {
        if (!user.emailVerified) 
        {
            throw new Error('Please verify your email address');
        } 

        return { user: serializeUser(user),
           userData: serializeUserData(userData), adminUserData: null };
      }       
      
    } 
    catch (error) 
    {
      console.error(error.message);
      throw error;
    }
  }, { serialize: (payload) => omit(payload, ['proactiveRefresh']), }
); 

export const logoutUser = createAsyncThunk('auth/logoutUser', 
  async () => {  await signOut(auth); console.log("You've signout!!!");
  });

export const getUserDataFromFirestore = async (user) => {
    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);
  
    if (userData.exists()) 
    {
      const userDataFromFirestore = userData.data();
      if (user.emailVerified) {
        // console.log('userDataFS', userDataFromFirestore);
        // alert(`Welcome to Rest-Le-BnB, ${userDataFromFirestore.firstname}`);
      } else { console.log('Please verify your email address to continue'); }
  
      omit(user, ['proactiveRefresh']);
      return { ...userDataFromFirestore };
    } 
    else 
    {
      console.log('data might be from google auth');
      return user;
    }
  };

  const initialState = {
    user: null,
    userData: null,
    adminUserData: null,
    loading: false,
    error: null,
  };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
      setUser: (state, action) => 
        {
          state.user = action.payload.user;
          state.userData = action.payload.userData;
          state.adminUserData = action.payload.adminUserData;
        },

      clearUser: (state) => 
        {
          state.user = null;
          state.userData = null;
        },
    },  
    extraReducers: (builder) => {  
        builder  
            .addCase(registerUser.pending, (state) => {  
                state.loading = true;  
                state.error = null;  
            })  
            .addCase(registerUser.fulfilled, (state, action) => {  
                state.loading = false;  
                state.user = action.payload;                 
            })  
            .addCase(registerUser.rejected, (state, action) => {  
                state.loading = false;  
                state.error = action.error.message;  
            }) 

            .addCase(loginUser.pending, (state) => {  
                state.loading = true;  
                state.error = null;  
            })  
            .addCase(loginUser.fulfilled, (state, action) => {  
                state.error = null;
                state.loading = false;  
                state.user = action.payload.user;  
                state.userData = action.payload.userData;
            })  
            .addCase(loginUser.rejected, (state, action) => {  
                state.loading = false;  
                state.error = action.error.message;  
            })  
            
            .addCase(logoutUser.fulfilled, (state) => {  
                state.user = null;  
            });  
    },  
}); 

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
