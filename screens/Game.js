import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchQuestionsFromCategory } from '../data/dataService';

const Game = ({ route }) => {
  const navigation = useNavigation();
  const { category } = route.params;
  const [fetchedQuestions, setFetchedQuestions] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [options, setOptions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      const fetchedQuestions = await fetchQuestionsFromCategory(category);

      setFetchedQuestions(fetchedQuestions);

      const questions = fetchedQuestions.map((question) => question.Kysymys);
      const options = fetchedQuestions.map((question) => question.Vaihtoehdot);

      setQuestions(questions);
      setOptions(options);
      setLoading(false);
    };

    fetchQuestions();
  }, [category]);

  const handleOptionSelect = (option) => {
    const correctAnswer = fetchedQuestions[currentQuestionIndex].Vastaus;

    if (option === correctAnswer) {
      Alert.alert('Oikea vastaus', 'Hyvin tehty!', [{ text: 'OK' }]);
      // Voit täällä päivittää pistemäärää tai tehdä muita toimia oikeasta vastauksesta
      // Esimerkiksi: päivitäPistemäärää();
    } else {
      Alert.alert('Väärä vastaus', `Oikea vastaus oli: ${correctAnswer}`, [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Endgame'), // Takaisin painikkeen logiikka väärässä vastauksessa
        },
      ]);
    }
  };

  if (loading) {
    return <Text>Ladataan kysymyksiä...</Text>;
  }

  return (
    <View>
      <Text>{questions[currentQuestionIndex]}</Text>
      {options[currentQuestionIndex].map((option, idx) => (
        <TouchableOpacity
          key={idx}
          onPress={() => handleOptionSelect(option)}
          style={{ margin: 10, padding: 10, backgroundColor: 'lightgray', borderRadius: 5 }}
        >
          <Text>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Game;
