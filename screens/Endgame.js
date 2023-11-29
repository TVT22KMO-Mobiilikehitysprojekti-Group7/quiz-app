import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { saveScore } from '../data/score';

const Endgame = ({ route }) => {
    const navigation = useNavigation();
    const { score } = route.params;

    useEffect(() => {
      saveScore(score);
    }, []);
  
    return (
      <View>
        <Text>Peli päättyi</Text>
        <Text>Pisteesi: {score} </Text>
        <Button
          title="Palaa päävalikkoon"
          onPress={() => navigation.navigate('Home')}
        />
      </View>
    );
   
};

export default Endgame;