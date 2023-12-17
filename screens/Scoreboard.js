// Scoreboard.js

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  FlatList,
  TouchableOpacity,
  ActivityIndicator, // Added import for ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchFirebaseScores, getLocalScores } from '../data/score';
import { LinearGradient } from 'expo-linear-gradient';

const Scoreboard = () => {
  const navigation = useNavigation();
  const [localScores, setLocalScores] = useState([]);
  const [firebaseScores, setFirebaseScores] = useState([]);
  const [selectedList, setSelectedList] = useState('top10');
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    const loadScores = async () => {
      try {
        const localScoresData = await getLocalScores();
        setLocalScores(localScoresData);

        const firebaseScoresData = await fetchFirebaseScores();
        setFirebaseScores(firebaseScoresData);

        setLoading(false); // Set loading to false when scores are loaded
      } catch (error) {
        console.error('Error fetching scores:', error);
        setFirebaseScores([]);
        setLoading(false); // Set loading to false on error as well
      }
    };

    loadScores();
  }, []);

  const sortedScores = (source) =>
    source && source.length > 0 ? source.sort((a, b) => b.score - a.score) : [];

  const todayScores = localScores.filter((item) => {
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

  const renderCategoryButton = (categoryKey, label) => (
    <TouchableOpacity
      key={categoryKey}
      style={{ ...styles.categoryButton, ...styles.button }} // Combine styles
      onPress={() => setSelectedList(categoryKey)}
      activeOpacity={0}
    >
      <LinearGradient
        colors={['orange', 'purple']}
        style={{ borderRadius: 2, padding: 2, width: 80, height: 30 }} // Adjust dimensions as needed
      >
        <Text style={styles.categoryButtonText}>{label}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      source={require('../assets/tietoviisas-on-screen.png')}
      style={styles.backgroundImage}
    >
      {loading ? ( // Display loading screen or indicator
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="white" />
        </View>
      ) : (
        // Render the scoreboard content
        <View style={styles.container}>
          <Text style={styles.title}>Pistetaulukko</Text>

          {/* Render category buttons */}
          <View style={styles.categoryButtonsContainer}>
            {data.map((category) =>
              renderCategoryButton(category.key, category.label)
            )}
          </View>

          <FlatList
            data={renderScoreList()}
            renderItem={({ item }) => (
              <View style={styles.scoreItem}>
                <Text>Pelaaja: {item.playerNickname}</Text>
                <Text>Pisteet: {item.score}</Text>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />

          {/* Updated "Takaisin" button styling */}
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.takaisinButton}
          >
            <LinearGradient
              colors={['orange', 'purple']}
              style={{ borderRadius: 10, padding: 10 }}
            >
              <Text style={styles.buttonText}>Takaisin</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}
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
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
    textAlign: 'center',
  },
  categoryButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  categoryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 0,
    borderRadius: 10,
  },
  categoryButtonText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
  },
  scoreItem: {
    marginBottom: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    borderRadius: 5,
  },
  // Updated "Takaisin" button styling
  takaisinButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 0,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: 'black',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // Loading screen styles
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default Scoreboard;
