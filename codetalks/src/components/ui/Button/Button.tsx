import React from 'react';
import { ActivityIndicator, GestureResponderEvent, Text, TouchableOpacity } from 'react-native';
import styles from './Button.style';

type Theme = 'primary' | 'secondary';

type ButtonProps = {
  text: string;
  onPress?: (event: GestureResponderEvent) => void;
  loading?: boolean;
  theme?: Theme;
};

const Button: React.FC<ButtonProps> = ({ text, onPress, loading = false, theme = 'primary' }) => {
  return (
    <TouchableOpacity style={styles[theme].container} onPress={onPress} disabled={loading}>
      {loading ? <ActivityIndicator color="white" /> : <Text style={styles[theme].title}>{text}</Text>}
    </TouchableOpacity>
  );
};

export default Button;
