import React from 'react';
import { View, TextInput, type TextInputProps } from 'react-native';
import Icon, {
  type MaterialDesignIconsIconName,
} from '@react-native-vector-icons/material-design-icons';

import styles from './Input.style';

type InputProps = {
  placeholder?: string;
  value: string;
  onType: (text: string) => void;
  iconName?: MaterialDesignIconsIconName;
  isSecure?: boolean;
  keyboardType?: TextInputProps['keyboardType'];
};

const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  onType,
  iconName,
  isSecure = false,
  keyboardType = 'default',
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize="none"
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#b3acac"
        onChangeText={onType}
        value={value}
        secureTextEntry={isSecure}
        keyboardType={keyboardType}
      />
      {iconName && <Icon name={iconName} size={25} color="gray" />}
    </View>
  );
};

export default Input;
