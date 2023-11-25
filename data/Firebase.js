import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-Nqj5ifCVjpZ7iNdlFTWufnL5hEvGX50",
  authDomain: "tietoviisas-fe817.firebaseapp.com",
  projectId: "tietoviisas-fe817",
  storageBucket: "tietoviisas-fe817.appspot.com",
  messagingSenderId: "772589460127",
  appId: "1:772589460127:web:09a188af8a45088efe60aa"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;