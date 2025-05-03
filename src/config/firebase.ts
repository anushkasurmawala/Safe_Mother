import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Log to check if environment variables are loading
const firebaseConfig = {
    apiKey: "AIzaSyDftIEKOpodRY2ZUeQ6kTrB0_TRJYrmmXc",
    authDomain: "maternal-health-5d22d.firebaseapp.com",
    projectId: "maternal-health-5d22d",
    storageBucket: "maternal-health-5d22d.firebasestorage.app",
    messagingSenderId: "222296939391",
    appId: "1:222296939391:web:85bdcdfd3a1a5f3cd4184a",
    measurementId: "G-4KTHV0GXGH"
};

// Initialize Firebase - prevent multiple instances
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize services
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
export default app;