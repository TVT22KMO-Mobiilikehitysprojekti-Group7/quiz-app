// Scoreboard.js

import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchFirebaseScores, getLocalScores } from '../data/score'; // Import the new functions
import StandardButton from '../components/StandardButton';

const Scoreboard = () => {
  const navigation = useNavigation();
  const [localScores, setLocalScores] = useState([]);
  const [firebaseScores, setFirebaseScores] = useState([]);
  const [showAllScores, setShowAllScores] = useState(true);

  useEffect(() => {
    const loadScores = async () => {
      const localScoresData = await getLocalScores();
      setLocalScores(localScoresData);

      try {
        const firebaseScoresData = await fetchFirebaseScores();
        setFirebaseScores(firebaseScoresData);
      } catch (error) {
        console.error('Error fetching scores from Firebase:', error);
        setFirebaseScores([]); // Handle the error by setting an empty array or a default value
      }
    };

    loadScores();
  }, []);

  const handleTop10Press = async () => {
    try {
      const newFirebaseScores = await fetchFirebaseScores();
      setFirebaseScores(newFirebaseScores);
      setShowAllScores(false); // Show Top10
    } catch (error) {
      console.error('Error fetching scores from Firebase:', error);
      setFirebaseScores([]); // Handle the error by setting an empty array or a default value
    }
  };

  const sortedScores = (source) =>
    source && source.length > 0 ? source.sort((a, b) => b.score - a.score) : [];

  const scoresToDisplay = showAllScores
    ? (localScores?.length > 0 ? sortedScores(localScores) : [])
    : sortedScores(firebaseScores);

  return (
    <ImageBackground
      source={require('../assets/tietoviisas-on-screen.png')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Scoreboard</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: showAllScores ? '#ccc' : '#fff' },
            ]}
            onPress={() => setShowAllScores(false)}
          >
            <Text>Kaikki</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: showAllScores ? '#fff' : '#ccc' },
            ]}
            onPress={() => setShowAllScores(true)}
          >
            <Text>Tänään</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: showAllScores ? '#fff' : '#ccc' },
            ]}
            onPress={handleTop10Press}
          >
            <Text>Top10</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={scoresToDisplay}
          renderItem={({ item }) => (
            <View style={styles.scoreItem}>
              <Text>Player: {item.playerNickname}</Text>
              <Text>Score: {item.score}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        <StandardButton 
        text={"Takaisin"}
        onPress={() => navigation.goBack()}
        buttonStyles={styles.takaisinButton}
         />
      </View>
    </ImageBackground>
  );
};

const styles = {
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  button: {
    padding: 10,
    borderRadius: 5,
  },
  scoreItem: {
    marginBottom: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    borderRadius: 5,
  },
  takaisinButton: {
    bottom: 10,
    left: 20,
    right: 20,
  },
};

export default Scoreboard;
