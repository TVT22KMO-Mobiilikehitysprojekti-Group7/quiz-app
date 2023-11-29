import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { loadQuestionsFromStorage } from '../data/dataService';

const Game = ({ route }) => {
  const navigation = useNavigation();
  const { category } = route.params;
  const [loadedQuestions, setLoadedQuestions] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [options, setOptions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(1000);
  const [delayTimer, setDelayTimer] = useState(null);
  const [scoringTimer, setScoringTimer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [canAnswer, setCanAnswer] = useState(false);

  let questionsAnswered = 0;

  useEffect(() => {
    const fetchQuestions = async () => {
      const loadedQuestions = await loadQuestionsFromStorage(category);

      setLoadedQuestions(loadedQuestions);

      const questions = loadedQuestions.map((question) => question.Kysymys);
      const options = loadedQuestions.map((question) => question.Vaihtoehdot);

      setQuestions(questions);
      setOptions(options);
      setLoading(false);
    };

    fetchQuestions();
  }, [category]);

  useEffect(() => {
    setTimers();
    // Clear the scoring timer when the component unmounts
    return () => clearInterval(delayTimer);
  }, []);
  

  const handleAnswerQuestion = (option) => {
    setCanAnswer(false);
    clearInterval(scoringTimer);
    const correctAnswer = loadedQuestions[currentQuestionIndex].Vastaus;

    if (option === correctAnswer) {
      questionsAnswered++;
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      if (questionsAnswered >= 2) {
        Alert.alert('Voitit Pelin!', 'Hyvin tehty!', [{ text: 'OK', onPress: () => navigation.navigate('Endgame', {score}) }]);
      } else {
        Alert.alert('Oikea vastaus', 'Hyvin tehty!', [{ text: 'OK' }]);
        setScore(score + 1000);
        setTimers();
      }
    } else {
      Alert.alert('Väärä vastaus', `Oikea vastaus oli: ${correctAnswer}`, [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Endgame', {score}), // Takaisin painikkeen logiikka väärässä vastauksessa
        },
      ]);
    }
  };

  const setTimers = () => {
    const delayTimer = setTimeout(() => {
      setCanAnswer(true);
      // Resume the scoring timer after the delay
      const timer = setInterval(() => {
        setScore((prevScore) => (prevScore > 0 ? prevScore - 1 : 0));
      }, 25);
      // Save the new scoring timer in state
      setScoringTimer(timer);
    }, 2000);
    setDelayTimer(delayTimer);
  }

  if (loading) {
    return <Text>Ladataan kysymyksiä...</Text>;
  }

  return (
    <View>
       <Text style={{ fontSize: 24 }}>Pisteet: {score}</Text>
      <Text>{questions[currentQuestionIndex]}</Text>
      {options[currentQuestionIndex].map((option, idx) => (
        <TouchableOpacity
          disabled={!canAnswer}
          key={idx}
          onPress={() => handleAnswerQuestion(option)}
          style={{ margin: 10, padding: 10, backgroundColor: 'lightgray', borderRadius: 5 }}
        >
          <Text>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Game;
