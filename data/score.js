// score.js

import AsyncStorage from '@react-native-async-storage/async-storage';
import db from './Firebase';
import { collection, addDoc, getDocs, query, orderBy, limit } from 'firebase/firestore';

const SCORES_COLLECTION = 'Scores';

// Function to save local scores
export const saveScore = async (score) => {
  try {
    // Save locally
    let localScores = await getLocalScores();
    console.log("Existing local scores:", localScores);

    if (!localScores) {
      localScores = [];
    }

    localScores.push(score);
    if (localScores.length > 10) {
      localScores.sort((a, b) => b.score - a.score);
      localScores = localScores.slice(0, 10);
    }

    console.log("New local scores to save:", localScores);
    await setLocalScores(localScores);

    // Save to Firebase
    const scoresCollection = collection(db, SCORES_COLLECTION);

    // Retrieve the player nickname from AsyncStorage
    const playerNickname = await AsyncStorage.getItem('playerNickname');

    // Add the new score to Firestore along with the player nickname
    await addDoc(scoresCollection, { score, playerNickname });

    // Fetch the top 10 scores from Firestore
    const firebaseScores = await fetchFirebaseScores();

    console.log("Top 10 scores from Firebase:", firebaseScores);
  } catch (error) {
    console.error("Error saving score:", error);
  }
}

// Function to retrieve local scores
export const getLocalScores = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(`local_scores`);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error("Error loading local scores: ", e);
    return null;
  }
};

// Function to set local scores
const setLocalScores = async (scores) => {
  try {
    const jsonValue = JSON.stringify(scores);
    await AsyncStorage.setItem(`local_scores`, jsonValue);
  } catch (e) {
    console.error("Error storing local scores: ", e);
  }
};

// Function to reset local scores
export const resetLocalScores = async () => {
  try {
    await AsyncStorage.setItem('local_scores', JSON.stringify([]));
  } catch (error) {
    console.error("Error resetting local scores: ", error);
  }
};

// Function to fetch top scores from Firebase
export const fetchFirebaseScores = async () => {
  try {
    const scoresCollection = collection(db, SCORES_COLLECTION);

    // Fetch the top 10 scores from Firestore
    const querySnapshot = await getDocs(query(scoresCollection, orderBy('score', 'desc'), limit(10)));
    
    // Extract and log the scores
    const newFirebaseScores = querySnapshot.docs.map(doc => doc.data().score);
    console.log("Top 10 scores from Firebase:", newFirebaseScores);

    return newFirebaseScores;
  } catch (error) {
    console.error('Error fetching scores from Firebase:', error);
    return []; // Handle the error by returning an empty array or a default value
  }
};
