import React, { useState } from 'react';
import { View, TouchableOpacity, Text, ImageBackground, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchQuestionsFromMultipleCategories } from '../data/dataService';
import { storeQuestionsInStorage } from '../data/dataService';
import StandardButton from '../components/StandardButton';

const GameSelection = () => {
  const navigation = useNavigation();
  const [selectedCategories, setSelectedCategories] = useState([]);

  const categories = [
    'Historia', 'Maantieto', 'Tiede', 'Viihde',
    'ElokuvatJaSarjat', 'Urheilu', 'Luonto', 'TaideJaKulttuuri'
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
  
    // Käytä valittuja kategorioita kysymysten hakemiseen
    const questions = await fetchQuestionsFromMultipleCategories(selectedCategories);
    await storeQuestionsInStorage('mixed', questions);
    navigation.navigate('Game', { 
      category: 'mixed',
      questions: questions, 
      multiplier: selectedCategories.length // Lisätty pistekerroin
    });
  };

  return (
    <ImageBackground
        source={require('../assets/tietoviisas-on-screen.png')}
        style={styles.backgroundImage}
    >
      <View>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => toggleCategorySelection(category)} 
            style={{ 
              margin: 15, padding: 10, 
              backgroundColor: selectedCategories.includes(category) ? 'lightblue' : 'lightgray', 
              borderRadius: 10, 
            }}
          >
            <Text>{category}</Text>
          </TouchableOpacity>
        ))}
        
        <StandardButton 
        text={"Aloita peli"}
        onPress={startGame}
        buttonStyles={styles.aloitaButton} 
        />
        <StandardButton 
        text={"Takaisin"}
        onPress={() => navigation.goBack()}
        buttonStyles={styles.takaisinButton}
         />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center'
  },
  aloitaButton: {
    bottom: -80,
    left: 20,
    right: 20,
  },
  takaisinButton: {
    bottom: -150,
    left: 20,
    right: 20,
  },
});

export default GameSelection;
