import React, { createContext, useContext, useState, useEffect } from 'react';
import { Audio } from 'expo-av';

const AudioContext = createContext({
  isMusicPlaying: true,
  isSoundEffectsEnabled: true,
  toggleMusic: () => {},
  toggleSoundEffects: () => {}
});

export const useAudio = () => useContext(AudioContext);

export const AudioProvider = ({ children }) => {
  const [isMusicPlaying, setIsMusicPlaying] = useState(true);
  const [isSoundEffectsEnabled, setIsSoundEffectsEnabled] = useState(true);
  const [backgroundMusic, setBackgroundMusic] = useState(null);

  useEffect(() => {
    // Lataa taustamusiikki
    const loadBackgroundMusic = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/background_music.mp3'),
        { shouldPlay: isMusicPlaying, isLooping: true }
      );
      setBackgroundMusic(sound);
    };

    loadBackgroundMusic();

    // Siivoa musiikki, kun komponentti poistuu käytöstä
    return () => {
      if (backgroundMusic) {
        backgroundMusic.unloadAsync();
      }
    };
  }, []);

  const toggleMusic = async () => {
    setIsMusicPlaying(!isMusicPlaying);
    if (backgroundMusic) {
      isMusicPlaying ? await backgroundMusic.pauseAsync() : await backgroundMusic.playAsync();
    }
  };

  const toggleSoundEffects = () => {
    setIsSoundEffectsEnabled(!isSoundEffectsEnabled);
  };

  return (
    <AudioContext.Provider value={{ isMusicPlaying, isSoundEffectsEnabled, toggleMusic, toggleSoundEffects }}>
      {children}
    </AudioContext.Provider>
  );
};
