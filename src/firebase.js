// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyAw5BhZsDOtJgfh_bBJR0ePAjMI4GSoq3M",
  authDomain: "arkanoid-cosmote-test.firebaseapp.com",
  projectId: "arkanoid-cosmote-test",
  storageBucket: "arkanoid-cosmote-test.appspot.com",
  messagingSenderId: "161595092359",
  appId: "1:161595092359:web:f1f284686914670a30f722",
  measurementId: "G-KEKR8NC757",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);
export { db };

export default app;
