import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getLocalScores } from '../data/score';

const Scoreboard = () => {
    const navigation = useNavigation();
    const [localScores, setLocalScores] = useState([]);

    useEffect(() => {
      const loadScores = async () => {
        const scores = await getLocalScores();
        console.log(scores);
        setLocalScores(scores);
      }
      loadScores();
    }, []);

    // Järjestä tulokset ennen FlatListiin syöttämistä
    const sortedScores = localScores && localScores.length > 0
        ? localScores.sort((a, b) => b - a)
        : [];

    return (
      <View>
        <Text> Scoreboard </Text>
        <FlatList
          data={sortedScores}
          renderItem={({item}) => <Text>{item}</Text>}
          keyExtractor={(item, index) => index.toString()} // Lisää keyExtractor
        />
        <Button
          title="Takaisin"
          onPress={() => navigation.goBack()}
        />
      </View>
    );
};

export default Scoreboard;
