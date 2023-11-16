import React from 'react';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Start = () => {
  const navigation = useNavigation();

  return (
    <Button
      title="Aloita"
      onPress={() => navigation.navigate('Nickname')}
    />
  );
};

export default Start;