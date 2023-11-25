import { collection, getDocs } from 'firebase/firestore';
import db from './Firebase';

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
