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
    <Button title="Tiede" onPress={() => handleCategorySelect('Tiede')} />
    <Button title="Viihde" onPress={() => handleCategorySelect('Viihde')} />
    <Button title="Elokuvat ja Sarjat" onPress={() => handleCategorySelect('ElokuvatJaSarjat')} />
    <Button title="Urheilu" onPress={() => handleCategorySelect('Urheilu')} />
    <Button title="Luonto" onPress={() => handleCategorySelect('Luonto')} />
    <Button title="Teknologia" onPress={() => handleCategorySelect('Teknologia')} />
    <Button title="Ruoka ja Juoma" onPress={() => handleCategorySelect('RuokaJaJuoma')} />
    <Button title="Taide ja Kulttuuri" onPress={() => handleCategorySelect('TaideJaKulttuuri')} />
    {/* Lisää tarvittaessa muita kategorioita */}
  </View>
  );
};

export default GameSelection;
