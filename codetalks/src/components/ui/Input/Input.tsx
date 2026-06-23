import React from 'react';
import { Text, TextInput, View, type TextInputProps } from 'react-native';

import styles from './Input.style';

type InputProps = {
  placeholder?: string;
  value?: string;
  onType?: (text: string) => void;
  isSecure?: boolean;
  keyboardType?: TextInputProps['keyboardType'];
  error?: string;
};

const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  onType,
  isSecure = false,
  keyboardType = 'default',
  error,
}) => {
  const hasError = Boolean(error);

  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize="none"
        style={[styles.input, hasError && styles.inputError]}
        placeholder={placeholder}
        placeholderTextColor="#fff"
        cursorColor="#fff"
        selectionColor="#fff"
        onChangeText={onType}
        value={value}
        secureTextEntry={isSecure}
        keyboardType={keyboardType}
        autoCorrect={false}
      />
      {hasError ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

export default Input;
