import React, { useState } from 'react';
import { View, Button, ScrollView, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchQuestionsFromMultipleCategories } from '../data/dataService';
import { storeQuestionsInStorage } from '../data/dataService';

const GameSelection = () => {
  const navigation = useNavigation();
  const [selectedCategories, setSelectedCategories] = useState([]);

  const categories = [
    'Historia', 'Maantieto', 'Tiede', 'Viihde',
    'Elokuvat ja Sarjat', 'Urheilu', 'Luonto', 'Taide ja Kulttuuri'
  ];

  const handleCategorySelect = async (category) => {
    const questions = await fetchQuestionsFromMultipleCategories(category);
    await storeQuestionsInStorage(category, questions);
    if (questions && questions.length > 0) {
      navigation.navigate('Game', { category });
    }
  };

  const toggleCategorySelection = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(cat => cat !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const startGame = async () => {
    if (selectedCategories.length === 0) {
      alert('Valitse vähintään yksi kategoria');
      return;
    }

    const questions = await fetchQuestionsFromMultipleCategories(selectedCategories);
    await storeQuestionsInStorage('mixed', questions);
    navigation.navigate('Game', { category: 'mixed' });
  };

  return (
    <ScrollView>
      <View>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => toggleCategorySelection(category)}
            style={{ 
              margin: 10, padding: 10, 
              backgroundColor: selectedCategories.includes(category) ? 'lightblue' : 'lightgray', 
              borderRadius: 5 
            }}
          >
            <Text>{category}</Text>
          </TouchableOpacity>
        ))}
        <Button title="Aloita peli" onPress={startGame} />
        <Button title="Takaisin" onPress={() => navigation.goBack()} />
      </View>
    </ScrollView>
  );
};
export default GameSelection;
