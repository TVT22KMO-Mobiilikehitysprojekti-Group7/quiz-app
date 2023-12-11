// Scoreboard.js

import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, Dimensions, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchFirebaseScores, getLocalScores } from '../data/score'; // Import the new functions
import StandardButton from '../components/StandardButton';
import ModalSelector from 'react-native-modal-selector';

const Scoreboard = () => {
  const navigation = useNavigation();
  const [localScores, setLocalScores] = useState([]);
  const [firebaseScores, setFirebaseScores] = useState([]);
  const [selectedList, setSelectedList] = useState('Tänään');
  const [showAllLocalScores, setShowAllLocalScores] = useState(false);

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

  const sortedScores = (source) =>
    source && source.length > 0 ? source.sort((a, b) => b.score - a.score) : [];

  const todayScores = localScores.filter(item => {
    const currentDate = new Date().toLocaleDateString();
    const scoreDate = new Date(item.date).toLocaleDateString();
    return scoreDate === currentDate;
  });

  const allLocalScoresList = sortedScores(localScores);
  const top10ScoresList = sortedScores(firebaseScores);

  const renderScoreList = () => {
    switch (selectedList) {
      case 'today':
        return todayScores;
      case 'top10':
        return top10ScoresList;
      case 'allLocal':
        return allLocalScoresList;
      default:
        return [];
    }
  };

  const data = [
    { key: 'today', label: 'Tänään' },
    { key: 'top10', label: 'Top 10' },
    { key: 'allLocal', label: 'Kaikki' },
  ];

  return (
    <ImageBackground
      source={require('../assets/tietoviisas-on-screen.png')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Scoreboard</Text>

        <ModalSelector
          data={data}
          initValue={selectedList}
          onChange={(option) => setSelectedList(option.key)}
          style={styles.picker}
          selectTextStyle={styles.pickerText}
          cancelText="Peruuta"
        />

        <FlatList
          data={renderScoreList()}
          renderItem={({ item }) => (
            <View style={styles.scoreItem}>
              <Text>Player: {item.playerNickname}</Text>
              <Text>Score: {item.score}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />

        <StandardButton
          text={'Takaisin'}
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
    justifyContent: 'flex-end', // Align content to the bottom of the container
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
    textAlign: 'center',
  },
  picker: {
    height: 50,
    marginBottom: 20,
    backgroundColor: 'white', // Set the background color to white
    borderRadius: 5,
    paddingLeft: 10,
  },
  pickerText: {
    fontSize: 16,
    color: 'white',
  },
  scoreItem: {
    marginBottom: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    borderRadius: 5,
  },
  takaisinButton: {
    marginVertical: 20, // Adjust the vertical margin as needed
  },
};

export default Scoreboard;