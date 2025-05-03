import { auth } from '../config/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile
} from 'firebase/auth';
import { saveUserData } from './userService';

export const authService = {
  async login(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, user: userCredential.user };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  },

  async signUp(email: string, password: string, name: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: name
      });
      
      // Save user data to Firestore
      await saveUserData(userCredential.user.uid, {
        uid: userCredential.user.uid,
        email,
        displayName: name,
        createdAt: new Date().toISOString()
      });

      return { success: true, user: userCredential.user };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  },

  async logout() {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  },

  async resetPassword(email: string) {
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }
};
