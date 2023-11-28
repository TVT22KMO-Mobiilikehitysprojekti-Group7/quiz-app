import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Endgame = () => {
    const navigation = useNavigation();
  
    return (
      <View>
        <Text> Peli päättyi </Text>
        <Button
          title="Palaa päävalikkoon"
          onPress={() => navigation.navigate('Home')}
        />
      </View>
    );
   
};

export default Endgame;