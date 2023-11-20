import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert, ToastAndroid } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Nickname = () => {
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
    //TODO: Reset points
    navigation.navigate('Home', { nickname: nickname })
  }

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
    <View>
      <TextInput
        placeholder="Syötä pelaajan nimi"
        value={nickname}
        onChangeText={setNickname}
      />
      <Button
        title="Valmis"
        onPress={() => setNicknameAndNavigate()}
      />
    </View>
  );
};

export default Nickname;