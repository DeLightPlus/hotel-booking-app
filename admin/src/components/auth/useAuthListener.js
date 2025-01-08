import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../firebase/firebase'; // Your Firebase config
import { setAdmin, clearAdmin } from '../../redux/authSlice';
import { getDoc, doc } from 'firebase/firestore';

const useAuthListener = () => {
  const dispatch = useDispatch();
  const { user, adminData } = useSelector((state) => state.auth);

  // Handle authentication state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Check if the user has admin data in Firestore
        const adminDataRef = doc(db, 'users', user.uid); // Assuming admin data is stored in the 'users' collection
        try {
          const docSnap = await getDoc(adminDataRef);

          if (docSnap.exists()) {
            const userData = docSnap.data();
            // Only set admin data if the role is 'admin'
            if (userData.role === 'admin') {
              dispatch(setAdmin({
                user: { uid: user.uid, email: user.email },
                adminData: { firstname: userData.firstname, lastname: userData.lastname, role: userData.role }
              }));
            } else {
              dispatch(clearAdmin()); // Clear admin data if user is not an admin
            }
          } else {
            dispatch(clearAdmin()); // Clear admin data if user does not exist in Firestore
          }
        } catch (error) {
          console.error('Error fetching admin data:', error);
          dispatch(clearAdmin()); // Clear admin data on error
        }
      } else {
        // User is logged out, clear data
        dispatch(clearAdmin());
      }
    });

    // Clean up the listener on component unmount
    return () => unsubscribe();
  }, [dispatch]);

  // Return user and adminData to be used in components
  return { user, adminData };
};

export default useAuthListener;
