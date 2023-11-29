import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveScore = async (score) => {
  // TODO: Tallenna pisteet myös palvelimelle
  let localScores = await getLocalScores();
  let minScore = 0;
  if (localScores) {
      minScore = Math.min(...localScores);
      console.log(minScore);
  } else {
    localScores = [];
  }
  if (minScore < score) {
      localScores.push(score);
  }
  if (localScores.length > 10) {
      //Remove lowest score
  }
  setLocalScores(localScores);
}

export const getLocalScores = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(`local_scores`);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // Latausvirheen käsittely
    console.error("Error loading local scores: ", e);
    return null;
  }
};

const setLocalScores = async (scores) => {
  try {
    const jsonValue = JSON.stringify(scores);
    await AsyncStorage.setItem(`local_scores`, jsonValue);
  } catch (e) {
    // Tallennusvirheen käsittely
    console.error("Error storing local scores: ", e);
  }
  };