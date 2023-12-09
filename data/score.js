// score.js

import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveScore = async (score) => {
  let localScores = await getLocalScores();
  console.log("Existing scores:", localScores);

  if (!localScores) {
    localScores = [];
  }

  localScores.push(score);
  if (localScores.length > 10) {
    localScores.sort((a, b) => b.score - a.score);
    localScores = localScores.slice(0, 10);
  }

  console.log("New scores to save:", localScores);
  await setLocalScores(localScores);
}

export const getLocalScores = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(`local_scores`);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error("Error loading local scores: ", e);
    return null;
  }
};

const setLocalScores = async (scores) => {
  try {
    const jsonValue = JSON.stringify(scores);
    await AsyncStorage.setItem(`local_scores`, jsonValue);
  } catch (e) {
    console.error("Error storing local scores: ", e);
  }
};

export const resetLocalScores = async () => {
  try {
    await AsyncStorage.setItem('local_scores', JSON.stringify([]));
  } catch (error) {
    console.error("Error resetting local scores: ", error);
  }
};
