import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Nickname = () => {
  const [nickname, setNickname] = useState('');
  const navigation = useNavigation();

  return (
    <View>
      <TextInput
        placeholder="Syötä pelaajan nimi"
        value={nickname}
        onChangeText={setNickname}
      />
      <Button
        title="Valmis"
        onPress={() => navigation.navigate('Home', { playerNickname: nickname })}
      />
    </View>
  );
};

export default Nickname;