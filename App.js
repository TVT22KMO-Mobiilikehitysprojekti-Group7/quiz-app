import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
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
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Nickname" component={Nickname} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="GameSelection" component={GameSelection} />
        <Stack.Screen name="Game" component={Game} />
        <Stack.Screen name="Scoreboard" component={Scoreboard} />
        <Stack.Screen name="Endgame" component={Endgame} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;