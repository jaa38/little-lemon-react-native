import React, { useState } from 'react';
import { TextInput, StyleSheet } from 'react-native';

export default function CustomTextInput(props) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <TextInput
      {...props}
      style={[
        styles.input,
        isFocused && styles.inputActive
      ]}
      placeholderTextColor="#999999"
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 'auto',

    borderWidth: 1,
    borderColor: '#C4CBC8',

    backgroundColor: '#C4CBC8',

    paddingHorizontal: 12,
    paddingVertical: 11,

    fontSize: 16,
    lineHeight: 24, // 150% of 16
    letterSpacing: -0.16, // -1%

    color: '#999999',

    borderRadius: 8,
  },

  inputActive: {
    borderColor: '#495E57',
    color: '#333333',
  },
});