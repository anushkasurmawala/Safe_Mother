import { doc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

interface UserData {
  uid: string;
  email: string;
  displayName: string;
  createdAt: string;
  [key: string]: any;
}

export const saveUserData = async (uid: string, userData: UserData) => {
  try {
    const userRef = doc(db, 'users', uid);
    await setDoc(userRef, userData);
    return true;
  } catch (error) {
    console.error('Error saving user data:', error);
    throw error;
  }
};
