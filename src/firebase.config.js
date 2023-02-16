import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3uBNmhhTqOEpdGC2HpVtn-vFTdRbWvA4",
  authDomain: "wee-petdocter.firebaseapp.com",
  projectId: "wee-petdocter",
  storageBucket: "wee-petdocter.appspot.com",
  messagingSenderId: "777572496476",
  appId: "1:777572496476:web:189276463c0747bf086299",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
