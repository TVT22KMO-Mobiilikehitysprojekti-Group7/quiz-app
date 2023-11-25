import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { fetchHistoriaQuestions } from '../data/dataService';

const QuizComponent = () => {
  const [historiaQuestions, setHistoriaQuestions] = useState([]);
  const [maantietoQuestions, setMaantietoQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      const fetchedHistoriaQuestions = await fetchQuestionsFromCategory('Historia');
      const fetchedMaantietoQuestions = await fetchQuestionsFromCategory('Maantieto');
      setHistoriaQuestions(fetchedHistoriaQuestions);
      setMaantietoQuestions(fetchedMaantietoQuestions);
      setLoading(false);
    };

    fetchQuestions();
  }, []);

  if (loading) {
    return <Text>Loading questions...</Text>;
  }

  return (
    <View>
      {questions.map((question, index) => (
        <View key={index}>
          <Text>{question.Kysymys}</Text>
          {question.Vaihtoehdot.map((option, idx) => (
            <Button key={idx} title={option} onPress={() => {/* Vastauslogiikka */}} />
          ))}
        </View>
      ))}
    </View>
  );
};

export default QuizComponent;
