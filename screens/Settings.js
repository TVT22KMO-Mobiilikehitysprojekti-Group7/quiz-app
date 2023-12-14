import React from 'react';
import { Text, ImageBackground, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import StandardButton from '../components/StandardButton';

export default Settings = () => {
    const navigation = useNavigation();
  
    return (
      <ImageBackground
      source={require('../assets/tietoviisas-on-screen.png')}
      style={styles.backgroundImage}
    >
        <Text style={styles.text}>Asetukset</Text>
        <StandardButton
          text={"Äänet"}
          onPress={() => toggleSounds()}
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

    function toggleSounds() {
        
    }
   
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