import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default StandardButton = ({ text, onPress, buttonStyles, textStyles }) => {
    return (
      
        <TouchableOpacity style={{...styles.button, ...buttonStyles}} onPress={onPress}>
          <LinearGradient
      colors={['orange', 'purple']}
      style={{ borderRadius: 15, padding: 10, width: 350, height: 50 }}
    >
            <Text style={{...styles.buttonText, ...textStyles}}>{text}</Text>
            </LinearGradient>
        </TouchableOpacity>
        
    )
}

const styles = StyleSheet.create({
    button: {
      borderRadius: 20,
      padding: 15,
      alignItems: 'center',
      position: 'absolute',
    },
    buttonText: {
      color: 'black',
      fontSize: 25,
      fontWeight: 'bold',
      textAlign: 'center',
    },
});

