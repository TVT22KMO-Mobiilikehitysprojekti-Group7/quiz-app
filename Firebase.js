import firebase from 'firebase/app';
import 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-Nqj5ifCVjpZ7iNdlFTWufnL5hEvGX50",
  authDomain: "tietoviisas-fe817.firebaseapp.com",
  projectId: "tietoviisas-fe817",
  storageBucket: "tietoviisas-fe817.appspot.com",
  messagingSenderId: "772589460127",
  appId: "1:772589460127:web:09a188af8a45088efe60aa"
};

// Alusta Firebase, jos sitä ei ole jo alustettu
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  // Vienti firestore viite
  const db = firebase.firestore();
  export default db;