import { Audio } from 'expo-av';

export const useBackgroundMusic = async () => {
  const { sound } = await Audio.Sound.createAsync(
    require('../assets/background_music.mp3'), // Osoita oikeaan mp3-tiedostoon
    { shouldPlay: true, isLooping: true }
  );

  return sound;
};