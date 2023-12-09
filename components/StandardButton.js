import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default StandardButton = ({ text, onPress, buttonStyles, textStyles }) => {
    return (
        <TouchableOpacity style={{...styles.button, ...buttonStyles}} onPress={onPress}>
            <Text style={{...styles.buttonText, ...textStyles}}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
      backgroundColor: 'rgba(255, 255, 255, .9)',
      borderRadius: 20,
      padding: 15,
      alignItems: 'center',
      position: 'absolute'
    },
    buttonText: {
      color: 'black',
      fontSize: 20,
      fontWeight: 'bold',
    },
});