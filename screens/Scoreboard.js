import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Scoreboard = () => {
    const navigation = useNavigation();
  
    return (
      <View>
        <Text> Scoreboard </Text>
        <Button
          title="Takaisin"
          onPress={() => navigation.goBack()}
        />
      </View>
    );
   
};

export default Scoreboard;