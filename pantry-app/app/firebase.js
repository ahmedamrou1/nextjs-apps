import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const FIREBASE_CONFIGURATION = {
  apiKey: "AIzaSyDoeI8s3AxBC87O9UWowt5m260YKH8v1ds",
  authDomain: "pantry-db223.firebaseapp.com",
  projectId: "pantry-db223",
  storageBucket: "pantry-db223.appspot.com",
  messagingSenderId: "208301283357",
  appId: "1:208301283357:web:63032b02ed7f415b968ef4",
  measurementId: "G-3825DPZY2Q"
};

const app = initializeApp(FIREBASE_CONFIGURATION);
const db = getFirestore(app);

export default db
