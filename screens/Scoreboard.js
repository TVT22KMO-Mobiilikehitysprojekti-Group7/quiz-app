// Scoreboard.js

import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getLocalScores } from '../data/score';

const Scoreboard = () => {
  const navigation = useNavigation();
  const [localScores, setLocalScores] = useState([]);
  const [showAllScores, setShowAllScores] = useState(true);

  useEffect(() => {
    const loadScores = async () => {
      const scores = await getLocalScores();
      console.log(scores);
      setLocalScores(scores);
    };
    loadScores();
  }, []);

  // Järjestä tulokset ennen FlatListiin syöttämistä
  const sortedScores = localScores && localScores.length > 0
    ? localScores.sort((a, b) => b.score - a.score)
    : [];

  // Filteröi tulokset näytettäväksi
  const scoresToDisplay = showAllScores
    ? sortedScores
    : sortedScores.filter(item => {
      const today = new Date().setHours(0, 0, 0, 0);
      const scoreDate = new Date(item.date).setHours(0, 0, 0, 0);
      return scoreDate === today;
    });

  return (
    <View>
      <Text> Scoreboard </Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 }}>
        <TouchableOpacity
          style={{
            padding: 10,
            backgroundColor: showAllScores ? '#ccc' : '#fff',
            borderRadius: 5,
          }}
          onPress={() => setShowAllScores(false)}
        >
          <Text>Kaikki</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: 10,
            backgroundColor: showAllScores ? '#fff' : '#ccc',
            borderRadius: 5,
          }}
          onPress={() => setShowAllScores(true)}
        >
          <Text>Tänään</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={scoresToDisplay}
        renderItem={({ item }) => (
          <View>
            <Text>Score: {item.score}</Text>
            <Text>Date: {new Date(item.date).toLocaleDateString()}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <Button
        title="Takaisin"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};

export default Scoreboard;
