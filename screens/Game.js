import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { loadQuestionsFromStorage } from '../data/dataService';
import { saveScore } from '../data/score';

const Game = ({ route }) => {
  const navigation = useNavigation();
  const { category, questions: loadedQuestionsFromRoute, multiplier = 1 } = route.params; 
  const [loadedQuestions, setLoadedQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(1000);
  const [delayTimer, setDelayTimer] = useState(null);
  const [scoringTimer, setScoringTimer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [canAnswer, setCanAnswer] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);
  const scoringIntervalRef = useRef(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      let categoriesArray = Array.isArray(category) ? category : [category];
  
      let questionsFromAllCategories = [];
  
      for (let cat of categoriesArray) {
        const questions = await loadQuestionsFromStorage(cat);
        questionsFromAllCategories = [...questionsFromAllCategories, ...questions];
      }
  
      const shuffledQuestions = shuffleArray(questionsFromAllCategories);
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
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  }

  const handleAnswerQuestion = (option) => {
    setCanAnswer(false);
    clearTimeout(delayTimer);
    clearInterval(scoringIntervalRef.current);

    const currentQuestion = loadedQuestions[currentQuestionIndex];
    const correctAnswer = currentQuestion.Vastaus;
  
    setSelectedOption(option);
    setCorrectOption(correctAnswer);
  
    if (option === correctAnswer) {
      let pointsToAdd = 1000 + (1000 * 0.01 * (multiplier - 1));
      let newScore = score + pointsToAdd;
      setScore(newScore); 
      setQuestionsAnswered(prev => prev + 1);
      if (questionsAnswered >= 9) {
        saveScore(newScore);
        navigation.navigate('Endgame', { score: newScore });
      } else {
        setTimeout(() => {
          nextQuestion();
        }, 1000);
      }
    } else {
      setTimeout(() => {
        navigation.navigate('Endgame', { score });
      }, 1000);
    }
  };
  

  const nextQuestion = () => {
    const newLoadedQuestions = loadedQuestions.filter((_, index) => index !== currentQuestionIndex);
    setLoadedQuestions(newLoadedQuestions);
    setSelectedOption(null);
    setCorrectOption(null);
  
    if (newLoadedQuestions.length > 0) {
      const nextQuestionIndex = Math.floor(Math.random() * newLoadedQuestions.length);
      setCurrentQuestionIndex(nextQuestionIndex);
      setTimers();
    } else {
      navigation.navigate('Endgame', { score });
    }
  };

  const setTimers = () => {
    const delayTimer = setTimeout(() => {
      setCanAnswer(true);
      scoringIntervalRef.current = setInterval(() => {
        setScore((prevScore) => {
          const newScore = prevScore > 0 ? prevScore - 1 : 0;
          if (newScore <= 0) {
            clearInterval(scoringIntervalRef.current);
            navigation.navigate('Endgame', { score: 0 });
          }
          return newScore;
        });
      }, 25);
    }, 2000);
    setDelayTimer(delayTimer);
  };

  if (loading) {
    return <Text>Loading questions...</Text>;
  }

  return (
    <ImageBackground
        source={require('../assets/tietoviisas-on-screen.png')}
        style={styles.backgroundImage}
    >
    <View>
      <Text style={{ fontSize: 24, color: 'white', bottom: -220, fontWeight: 'bold' }}>Score: {score}</Text>
      <Text style={{ fontSize: 20, color: 'white', bottom: -220, fontWeight: 'bold' }}>Question {questionsAnswered + 1} / 10</Text>
      <Text style={{ fontSize: 20, color: 'white', bottom: -220, fontWeight: 'bold' }}>{loadedQuestions[currentQuestionIndex]?.Kysymys}</Text>
      {loadedQuestions[currentQuestionIndex]?.Vaihtoehdot.map((option, idx) => (
      <TouchableOpacity
        disabled={!canAnswer}
        key={idx}
        onPress={() => handleAnswerQuestion(option)}
        style={{
          margin: 10,
          padding: 10,
          backgroundColor:
            selectedOption === option
              ? option === correctOption
                ? 'green' // Correct answer selected
                : 'red' // Incorrect answer selected
              : option === correctOption
              ? 'green' // Correct answer not selected
              : 'lightgray',
          borderRadius: 5,
          bottom: -220,
        }}
      >
        <Text style={{ color: selectedOption === option ? 'white' : 'black' }}>
          {option}
        </Text>
      </TouchableOpacity>
    ))}
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
});

export default Game;


