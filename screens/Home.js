import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const playerNickname = route.params?.playerNickname || 'vieras';

  return (
    <View>
      <Text>Hei, {playerNickname}!</Text>
      <Button
        title="Pelaa"
        onPress={() => navigation.navigate('Play')}
      />
      <Button
        title="Pisteet"
        onPress={() => navigation.navigate('Scores')}
      />
      <Button
        title="Asetukset"
        onPress={() => navigation.navigate('Settings')}
      />
    </View>
  );
};

export default Home;