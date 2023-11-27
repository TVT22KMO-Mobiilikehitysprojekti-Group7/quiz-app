import { collection, getDocs } from 'firebase/firestore';
import db from './Firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchQuestionsFromCategory = async (categoryName) => {
  try {
    // Oikea tapa viitata alikokoelmaan
    const categoryCollectionRef = collection(db, "Kategoriat", categoryName, "Kysymys");
    const querySnapshot = await getDocs(categoryCollectionRef);
    const questions = [];
    querySnapshot.forEach((doc) => {
      questions.push({ id: doc.id, ...doc.data() });
    });
    return questions;
  } catch (error) {
    console.error(`Error fetching questions from ${categoryName}:`, error);
    return [];
  }
};

// Funktio kysymysten tallentamiseen AsyncStorageyn
export const storeQuestionsInStorage = async (category, questions) => {
  try {
    const jsonValue = JSON.stringify(questions);
    await AsyncStorage.setItem(`@${category}_questions`, jsonValue);
  } catch (e) {
    // Tallennusvirheen käsittely
    console.error("Error storing questions:", e);
  }
};

// Funktio kysymysten lataamiseen AsyncStoragestä
export const loadQuestionsFromStorage = async (category) => {
  try {
    const jsonValue = await AsyncStorage.getItem(`@${category}_questions`);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // Latausvirheen käsittely
    console.error("Error loading questions:", e);
    return null;
  }
};

//Tässä koodissa preloadQuestionsForAllCategories käy läpi kaikki määritellyt kategoriat, hakee kysymykset kustakin ja tallentaa ne paikalliseen tallennustilaan.
const categories = ["Historia", "Maantieto", "Tiede", "Viihde", "ElokuvatJaSarjat", "Urheilu", "Luonto", "Teknologia", "RuokaJaJuoma", "TaideJaKulttuuri"];

export const preloadQuestionsForAllCategories = async () => {
  for (const category of categories) {
    const questions = await fetchQuestionsFromCategory(category);
    await storeQuestionsInStorage(category, questions);
  }
};