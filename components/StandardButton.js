import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Audio } from 'expo-av';
import { useAudio } from '../components/AudioContext';

export default StandardButton = ({ text, onPress, buttonStyles, textStyles }) => {
  const { isSoundEffectsEnabled } = useAudio();

  const playSoundEffect = async () => {
    if (isSoundEffectsEnabled) {
      const sound = new Audio.Sound();
      try {
        await sound.loadAsync(require('../assets/buttonclick.mp3'));
        await sound.playAsync();
        sound.setOnPlaybackStatusUpdate(async (status) => {
          if (status.didJustFinish) {
            await sound.unloadAsync();
          }
        });
      } catch (error) {
        console.error("Error playing sound:", error);
      }
    }
  };
  const handlePress = async () => {
    await playSoundEffect();
    onPress();
  };

  return (
    <TouchableOpacity style={{...styles.button, ...buttonStyles}} onPress={handlePress}>
      <LinearGradient
        colors={['orange', 'purple']}
        style={{ borderRadius: 15, padding: 10, width: 350, height: 50 }}
      >
        <Text style={{...styles.buttonText, ...textStyles}}>{text}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    position: 'absolute',
  },
  buttonText: {
    color: 'black',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
