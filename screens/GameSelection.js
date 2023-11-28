import React from 'react';
import { View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchQuestionsFromCategory, storeQuestionsInStorage, loadQuestionsFromStorage } from '../data/dataService';

const GameSelection = () => {
  const navigation = useNavigation();

  const handleCategorySelect = async (category) => {
    // Yritä ensin ladata kysymykset paikallisesta tallennustilasta
    let questions = await loadQuestionsFromStorage(category);

    if (questions && questions.length > 0) {
      console.log(`Kysymykset ladattu paikallisesta tallennustilasta kategorialle: ${category}`);
    } else {
      console.log(`Kysymyksiä ei löytynyt paikallisesta tallennustilasta, haetaan Firestoresta kategorialle: ${category}`);
      questions = await fetchQuestionsFromCategory(category);
      await storeQuestionsInStorage(category, questions);
    }

    // Navigoi Game-näyttöön välittäen kysymykset
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
    <Button title="Takaisin" onPress={() => navigation.goBack()} />
  </View>
  );
};

export default GameSelection;
