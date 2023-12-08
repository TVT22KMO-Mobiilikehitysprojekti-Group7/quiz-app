import React, { useEffect } from 'react';
import { Text, ImageBackground, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StandardButton from '../components/StandardButton';

export default Start = () => {
  const navigation = useNavigation();
  let nickname = null;

  const getNicknameFromStorage = async () => {
    try {
      return await AsyncStorage.getItem('nickname');
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  useEffect(() => {
    getNicknameFromStorage().then((result) => {
      if (result) {
        nickname = result;
      }
    });
  }, []);

  const navigate = () => {
    if (nickname) {
      navigation.navigate('Home', { nickname: nickname })
    } else {
      navigation.navigate('Nickname')
    }
  }

  return (
    <ImageBackground
        source={require('../assets/tietoviisas-on-screen.png')}
        style={styles.backgroundImage}
    >
      <Text style={styles.text}>TIETOVIISAS</Text>
      <StandardButton
        text={"Aloita"}
        onPress={navigate}
        buttonStyles={styles.aloitaButton}
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
  aloitaButton: {
    bottom: 40,
    left: 20,
    right: 20,
  },
  text: {
    color: 'white',
    fontSize: 32,
    textAlign: 'center',
    top: 110
  },
});