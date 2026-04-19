import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  View,
  GestureResponderEvent,
} from 'react-native';
import Icon, {
  type MaterialDesignIconsIconName,
} from '@react-native-vector-icons/material-design-icons';
import styles from './Button.style';

type Theme = 'primary' | 'secondary';

type ButtonProps = {
  text: string;
  onPress: (event: GestureResponderEvent) => void;
  loading?: boolean;
  icon?: MaterialDesignIconsIconName;
  theme?: Theme;
};

const Button: React.FC<ButtonProps> = ({
  text,
  onPress,
  loading = false,
  icon,
  theme = 'primary',
}) => {
  return (
    <TouchableOpacity
      style={styles[theme].container}
      onPress={onPress}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <View style={styles[theme].button_container}>
          {icon && <Icon name={icon} color="white" size={18} />}
          <Text style={styles[theme].title}>{text}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Button;
