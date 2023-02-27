// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage,ref } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    projectId: import.meta.env.VITE_PROJECT_ID,
    appId: import.meta.env.VITE_APP_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage(app);
export const provider = new GoogleAuthProvider();
export default app;
