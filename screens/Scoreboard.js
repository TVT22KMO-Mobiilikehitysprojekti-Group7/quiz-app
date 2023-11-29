import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLocalScores } from '../data/score';

const Scoreboard = () => {
    const navigation = useNavigation();
    const [localScores, setLocalScores] = useState([]);

    useEffect(() => {
      const localScores = async () => {
        const localScores = await getLocalScores();
        console.log(localScores);
        setLocalScores(localScores);
      }
      localScores();
    }, []);
  
    return (
      <View>
        <Text> Scoreboard </Text>
        <FlatList
          data={localScores.sort((a, b) => b - a)}
          renderItem={({item}) => <Text>{item}</Text>}
        />
        <Button
          title="Takaisin"
          onPress={() => navigation.goBack()}
        />
      </View>
    );
   
};

export default Scoreboard;