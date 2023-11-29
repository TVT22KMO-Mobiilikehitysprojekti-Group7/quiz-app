import React from 'react';
import { View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchQuestionsFromCategory, storeQuestionsInStorage, loadQuestionsFromStorage } from '../data/dataService';

const GameSelection = () => {
  const navigation = useNavigation();

  const handleCategorySelect = async (category) => {
    questions = await fetchQuestionsFromCategory(category);
    await storeQuestionsInStorage(category, questions);
    if (questions && questions.length > 0) {
      // Navigoi Game-näyttöön välittäen kysymykset
      navigation.navigate('Game', { category });
    }
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
    <Button title="Taide ja Kulttuuri" onPress={() => handleCategorySelect('TaideJaKulttuuri')} />
    {/* Lisää tarvittaessa muita kategorioita */}
    <Button title="Takaisin" onPress={() => navigation.goBack()} />
  </View>
  );
};

export default GameSelection;
