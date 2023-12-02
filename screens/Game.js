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

  const [questionsAnswered, setQuestionsAnswered] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      const loadedQuestions = await loadQuestionsFromStorage(category);
      const shuffledQuestions = shuffleArray(loadedQuestions);
      setLoadedQuestions(shuffledQuestions);
      setLoading(false);
    };

    fetchQuestions();
  }, [category]);


  useEffect(() => {
    setTimers();
    // Clear the scoring timer when the component unmounts
    return () => clearInterval(delayTimer);
  }, []);

  const shuffleArray = (array) => {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }


  const handleAnswerQuestion = (option) => {
    setCanAnswer(false);
    clearInterval(scoringTimer);
    const currentQuestion = loadedQuestions[currentQuestionIndex];
    const correctAnswer = currentQuestion.Vastaus;
  
    if (option === correctAnswer) {
      let newScore = score + 1000; // Päivitä pisteet ennen navigointia
      setQuestionsAnswered(questionsAnswered + 1);
  
      if (questionsAnswered + 1 >= 10) {
        navigation.navigate('Endgame', { score: newScore }); // Lähetä uusi pistemäärä
      } else {
        setScore(newScore); // Päivitä pisteet normaalisti
        Alert.alert('Oikea vastaus', 'Hyvin tehty!', [{ text: 'OK', onPress: () => nextQuestion() }]);
      }
    } else {
      // Jos vastaus on väärin, näytä ilmoitus ja navigoi Endgameen
      Alert.alert('Väärä vastaus', `Oikea vastaus oli: ${correctAnswer}`, [
        { text: 'OK', onPress: () => navigation.navigate('Endgame', { score }) },
      ]);
    }
  };


  const nextQuestion = () => {
    const newLoadedQuestions = loadedQuestions.filter((_, index) => index !== currentQuestionIndex);
    setLoadedQuestions(newLoadedQuestions);
  
    if (newLoadedQuestions.length > 0) {
      const nextQuestionIndex = Math.floor(Math.random() * newLoadedQuestions.length);
      setCurrentQuestionIndex(nextQuestionIndex);
      setTimers();
    } else {
      // Kun peli päättyy
      navigation.navigate('Endgame', { score });
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
      <Text style={{ fontSize: 20 }}>Kysymys {questionsAnswered + 1} / 10</Text>
      <Text>{loadedQuestions[currentQuestionIndex]?.Kysymys}</Text>
      {loadedQuestions[currentQuestionIndex]?.Vaihtoehdot.map((option, idx) => (
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
