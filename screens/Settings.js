import React from 'react';
import { Text, ImageBackground, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import StandardButton from '../components/StandardButton';
import { useAudio } from '../components/AudioContext';

export default Settings = () => {
  const navigation = useNavigation();
  const { isMusicPlaying, toggleMusic } = useAudio();

  return (
    <ImageBackground
      source={require('../assets/tietoviisas-asetukset.png')}
      style={styles.backgroundImage}
    >
        <StandardButton
          text={isMusicPlaying ? "Taustamusiikki päällä" : "Taustamusiikki pois"}
          onPress={toggleMusic}
          buttonStyles={styles.buttonÄänet}
        />
        <StandardButton
          text={"Vaihda nimimerkki"}
          onPress={() => navigation.navigate('Nickname')}
          buttonStyles={styles.buttonVaihdanimimerkki}
        />
        <StandardButton
          text={"Takaisin"}
          onPress={() => navigation.goBack()}
          buttonStyles={styles.buttonTakaisin}
        />
      </ImageBackground>
    );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center'
  },
  buttonÄänet: {
    bottom: 180,
    left: 20,
    right: 20,
  },
  buttonVaihdanimimerkki: {
    bottom: 100,
    left: 20,
    right: 20,
  },
  buttonTakaisin: {
    bottom: 20,
    left: 20,
    right: 20,
  },
  text: {
    color: 'white',
    fontSize: 32,
    textAlign: 'center',
    top: 120
  },
});
