import React, { useEffect } from 'react';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Start = () => {
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

  return (
    <Button
      title="Aloita"
      onPress={() => navigate()}
    />
  );

  function navigate() {
    if (nickname) {
      navigation.navigate('Home', { nickname: nickname })
    } else {
      navigation.navigate('Nickname')
    }
  }
};

export default Start;