import React, { useState } from 'react';
import { TextInput, StyleSheet } from 'react-native';

export default function CustomTextInput(props) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <TextInput
      {...props}
      style={[styles.input, isFocused && styles.inputActive]}
      placeholderTextColor='#999999'
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#C4CBC8',
    backgroundColor: '#EDEFEE',
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333333',
    borderRadius: 8,
    fontFamily: 'Karla-Regular',
  },
  inputActive: {
    borderColor: '#495E57',
  },
});