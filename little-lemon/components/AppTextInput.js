import React, { useState } from 'react';
import { TextInput } from 'react-native';
import { MaskedTextInput } from 'react-native-mask-text';
import { View, Text, StyleSheet } from 'react-native';

export default function AppTextInput({
  label,
  value,
  onChangeText,
  placeholder,
  mask,
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      {/* Label */}
      {label && <Text style={styles.label}>{label}</Text>}

      {/* Input */}
      {mask ? (
        <MaskedTextInput
          mask={mask}
          value={value}
          onChangeText={(text, rawText) => onChangeText(rawText)}
          placeholder={placeholder}
          placeholderTextColor='#999999'
          style={[styles.input, isFocused && styles.inputActive]}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          keyboardType='numeric'
        />
      ) : (
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor='#999999'
          style={[styles.input, isFocused && styles.inputActive]}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },

  /* LABEL */
  label: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: -0.12,
    fontWeight: '500',
    color: '#495E57',
    marginBottom: 6,
  },

  /* INPUT BASE */
  input: {
    width: '100%',
    height: 48,

    borderWidth: 1,
    borderColor: '#C4CBC8', // corrected typo

    backgroundColor: '#FFFFFF',

    paddingHorizontal: 12,

    borderRadius: 8,

    fontFamily: 'Karla-Regular',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
    color: '#999999',
  },

  /* ACTIVE STATE */
  inputActive: {
    borderColor: '#495E57',
    backgroundColor: '#EDEFEE',
    color: '#333333',
  },
});
