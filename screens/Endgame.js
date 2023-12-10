// endgame.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, Button , ImageBackground, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { saveScore } from '../data/score';
import StandardButton from '../components/StandardButton';

const getFeedback = (score) => {
  if (score < 3000) {
    return 'Kehityskelpoinen';
  } else if (score >= 3000 && score < 6000) {
    return 'Mukavasti';
  } else if (score >= 6000 && score < 8000) {
    return 'Mestari';
  } else if (score >= 8000 && score < 12000) {
    return 'Epic';
  } else {
    return 'Mastermind';
  }
};


const Endgame = ({ route }) => {
  const navigation = useNavigation();
  const { score } = route.params;
  const feedback = getFeedback(score);
  const [gameDate, setGameDate] = useState(null);

  useEffect(() => {
    const saveGameResult = async () => {
      const getNickname = async () => {
        const storedNickname = await AsyncStorage.getItem('nickname');
        return storedNickname;
      };
  
      const playerNickname = await getNickname();
      const currentDate = new Date();
      setGameDate(currentDate);
      saveScore({ playerNickname, score, date: currentDate });
    };
  
    saveGameResult();
  }, []);
  
  return (
    <ImageBackground
      source={require('../assets/tietoviisas-on-screen.png')}
      style={styles.backgroundImage}
    >
    <View>
      <Text style={styles.text}>Peli päättyi</Text>
      <Text style={styles.text}>
        Pisteesi: {score}
        {"\n"}
        Palaute: {feedback}
        {"\n"}
        Päivänmäärä: {gameDate?.toLocaleDateString()}
      </Text>
      <StandardButton
        text={"Palaa päävalikkoon"}
        onPress={() => navigation.navigate('Home')}
        buttonStyles={styles.kotiButton}
      />
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center'
  },
  kotiButton: {
    bottom: -260,
    left: 20,
    right: 20,
  },
  text: {
    color: 'white',
    fontSize: 32,
    textAlign: 'center',
    top: 170
  },
});

export default Endgame;

