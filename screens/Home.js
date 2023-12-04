import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
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
    <View>
      <Text>Hei, {playerNickname}!</Text>
      <Button
        title="Pelaa"
        onPress={() => navigation.navigate('GameSelection')}
      />
      <Button
        title="Pisteet"
        onPress={() => navigation.navigate('Scoreboard')}
      />
      <Button
        title="Asetukset"
        onPress={() => navigation.navigate('Settings')}
      />
    </View>
  );
};

export default Home;
