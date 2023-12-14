import React, { useState } from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StandardButton from '../components/StandardButton';

export default Home = () => {
  const navigation = useNavigation();
  const [playerNickname, setPlayerNickname] = useState('vieras');

  const loadNickname = async () => {
    try {
      const storedNickname = await AsyncStorage.getItem('nickname');
      if (storedNickname) {
        setPlayerNickname(storedNickname);
      }
    } catch (error) {
      console.error('Virhe ladataessa nimimerkkiä:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadNickname();
    }, [])
  );

  return (
    <ImageBackground
      source={require('../assets/tietoviisas-on-screen.png')}
      style={styles.backgroundImage}
    >
      <Text style={styles.greetingText}>Hei, {playerNickname}!</Text>
      <StandardButton
        text={"Pelaa"}
        onPress={() => navigation.navigate('GameSelection')}
        buttonStyles={styles.buttonPelaa}
      />
      <StandardButton
        text={"Pisteet"}
        onPress={() => navigation.navigate('Scoreboard')}
        buttonStyles={styles.buttonPisteet}
      />
      <StandardButton
        text={"Asetukset"}
        onPress={() => navigation.navigate('Settings')}
        buttonStyles={styles.buttonAsetukset}
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
  greetingText: {
    color: 'lightgreen',
    fontSize: 28,
    textAlign: 'center',
    top: 120
  },
  buttonPelaa: {
    bottom: 180,
    left: 20,
    right: 20,
  },
  buttonPisteet: {
    bottom: 100,
    left: 20,
    right: 20,
  },
  buttonAsetukset: {
    bottom: 20,
    left: 20,
    right: 20,
  }
});