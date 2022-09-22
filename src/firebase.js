// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDaCm0HHcO6-HWEpBALM27UsgSN-CoQczM",
  authDomain: "arkanoid-cosmote.firebaseapp.com",
  projectId: "arkanoid-cosmote",
  storageBucket: "arkanoid-cosmote.appspot.com",
  messagingSenderId: "729546609362",
  appId: "1:729546609362:web:bfa7b29a75096a2787930b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);
export { db };

export default app;
