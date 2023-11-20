import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default Settings = () => {
    const navigation = useNavigation();
  
    return (
      <View>
        <Button
          title="Äänet"
          onPress={() => toggleSounds()}
        />
        <Button
          title="Vaihda nimimerkki"
          onPress={() => navigation.navigate('Nickname')}
        />
        <Button
          title="Takaisin"
          onPress={() => navigation.goBack()}
        />
      </View>
    );

    function toggleSounds() {
        
    }
   
};