// endgame.js

import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { saveScore } from '../data/score';

const getFeedback = (score) => {
  if (score < 3000) {
    return 'Kehityskelpoinen';
  } else if (score >= 3000 && score < 6000) {
    return 'Mukavasti';
  } else if (score >= 6000 && score < 8000) {
    return 'Mestari';
  } else if (score >= 8000 && score < 12000) {
    return 'Epic';
  } else {
    return 'Mastermind';
  }
};

const Endgame = ({ route }) => {
  const navigation = useNavigation();
  const { score } = route.params;
  const feedback = getFeedback(score);
  const [gameDate, setGameDate] = useState(null);

  useEffect(() => {
    const currentDate = new Date();
    setGameDate(currentDate);
    saveScore({ score, date: new Date() });  // Lisätty päivämäärä tallennukseen
  }, []);

  return (
    <View>
      <Text>Game Over</Text>
      <Text>
        Your Score: {score}
        {"\n"}
        Feedback: {feedback}
        {"\n"}
        Date: {gameDate?.toLocaleDateString()}
      </Text>
      <Button
        title="Back to Main Menu"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
};

export default Endgame;
