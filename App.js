import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';
import Start from './screens/Start';
import Nickname from './screens/Nickname';
import Home from './screens/Home';
import Settings from './screens/Settings';
import GameSelection from './screens/GameSelection';
import Game from './screens/Game';
import { preloadQuestionsForAllCategories } from './data/dataService';
import Scoreboard from './screens/Scoreboard';
import Endgame from './screens/Endgame';

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    preloadQuestionsForAllCategories(); // Lataa kysymykset käynnistyessä
  }, []);

  return (
    <>
      <StatusBar hidden={true} />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} options={{ headerShown: false }} />
        <Stack.Screen name="Nickname" component={Nickname} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
        <Stack.Screen name="GameSelection" component={GameSelection} options={{ headerShown: false }} />
        <Stack.Screen name="Game" component={Game} options={{ headerShown: false }} />
        <Stack.Screen name="Scoreboard" component={Scoreboard} options={{ headerShown: false }} />
        <Stack.Screen name="Endgame" component={Endgame} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;