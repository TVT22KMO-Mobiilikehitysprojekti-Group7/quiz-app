import React, { useState, useEffect } from 'react';
import { TextInput, Alert, ToastAndroid, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { resetLocalScores } from '../data/score';

export default Nickname = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [nickname, setNickname] = useState(route.params?.nickname);
  const [storageNickname, setStorageNickname] = useState(null);

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
        setStorageNickname(result);
      }
    });
  }, []);

  const setNicknameToStorage = async (nickname) => {
    try {
      if (nickname) {
        await AsyncStorage.setItem('nickname', nickname);
        setNickname(nickname);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const changeNicknameAndResetPoints = () => {
    setNicknameToStorage(nickname);
    resetLocalScores(); // Nollaa pisteet
    navigation.navigate('Home', { nickname: nickname });
  };

  const nicknameChangeAlert = () =>
    Alert.alert('Huomio!', 'Nimimerkin vaihtaminen nollaa pisteesi. Haluatko varmasti vaihtaa nimimerkin?', [
      {
        text: 'Peruuta'
      },
      {
        text: 'Kyllä',
        onPress: () => changeNicknameAndResetPoints()
      },
    ],
    {
      cancelable: false,
    }
  );

  const setNicknameAndNavigate = () => {
    if (!nickname) {
      ToastAndroid.show('Syötä nimimerkki!', ToastAndroid.SHORT);
      return;
    }
    if (storageNickname && storageNickname != nickname) {
      nicknameChangeAlert()
    } else {
      setNicknameToStorage(nickname)
      navigation.navigate('Home', { nickname: nickname })
    }
  }

  return (
    <ImageBackground
        source={require('../assets/tietoviisas-on-screen.png')}
        style={styles.backgroundImage}
    >
      <TextInput
        label="Nimimerkki"
        placeholder="Syötä pelaajan nimi"
        placeholderTextColor='white'
        underlineColorAndroid='white'
        value={nickname}
        onChangeText={setNickname}
        style={styles.nicknameText}
      />
      <StandardButton
        text={"Valmis"}
        onPress={setNicknameAndNavigate}
        buttonStyles={styles.valmisButton}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  nicknameText: {
    position: 'absolute',
    color: 'white',
    height: 40,
    margin: 10,
    padding: 10,
    bottom: 200,
    left: 10,
    right: 10,
    fontSize: 20,
    fontWeight: 'bold'
  },
  valmisButton: {
    bottom: 40,
    left: 20,
    right: 20,
  }
});