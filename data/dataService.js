import { collection, getDocs } from 'firebase/firestore';
import db from './Firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchQuestionsFromMultipleCategories = async (categories) => {
  try {
    let allQuestions = [];

    for (const category of categories) {
      const categoryCollectionRef = collection(db, "Kategoriat", category, "Kysymys");
      const querySnapshot = await getDocs(categoryCollectionRef);

      querySnapshot.forEach((doc) => {
        allQuestions.push({ id: doc.id, ...doc.data() });
      });
    }

    return allQuestions;
  } catch (error) {
    console.error("Error fetching questions from multiple categories:", error);
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
    const questions = jsonValue != null ? JSON.parse(jsonValue) : null;
    console.log(`Ladatut kysymykset kategoriasta ${category}:`, questions);
    return questions;
  } catch (e) {
    console.error("Error loading questions:", e);
    return null;
  }
};



//Tässä koodissa preloadQuestionsForAllCategories käy läpi kaikki määritellyt kategoriat, hakee kysymykset kustakin ja tallentaa ne paikalliseen tallennustilaan.
const categories = ["Historia", "Maantieto", "Tiede", "Viihde", "ElokuvatJaSarjat", "Urheilu", "Luonto", "TaideJaKulttuuri"];

export const preloadQuestionsForAllCategories = async () => {
  const allQuestions = await fetchQuestionsFromMultipleCategories(categories);
  for (const category of categories) {
    const categoryQuestions = allQuestions.filter(question => question.category === category);
    await storeQuestionsInStorage(category, categoryQuestions);
  }
};