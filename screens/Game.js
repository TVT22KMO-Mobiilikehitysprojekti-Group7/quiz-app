import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { fetchQuestionsFromCategory } from '../data/dataService';

const Game = ({ route }) => {
  const { category } = route.params;
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      const fetchedQuestions = await fetchQuestionsFromCategory(category);
      setQuestions(fetchedQuestions);
      setLoading(false);
    };

    fetchQuestions();
  }, [category]);

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

export default Game;
