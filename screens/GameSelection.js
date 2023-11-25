import React from 'react';
import { View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const GameSelection = () => {
  const navigation = useNavigation();

  const handleCategorySelect = async (category) => {
    // Voit halutessasi hakea kysymykset tässä vaiheessa tai Game-näytössä
    navigation.navigate('Game', { category });
  };

  return (
    <View>
      <Button title="Historia" onPress={() => handleCategorySelect('Historia')} />
      <Button title="Maantieto" onPress={() => handleCategorySelect('Maantieto')} />
      {/* Lisää tarvittaessa muita kategorioita */}
    </View>
  );
};

export default GameSelection;
