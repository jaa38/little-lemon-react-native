import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { typography } from '../styles/typography';

export default function PrimaryButton({ title, onPress, disabled }) {
  return (
    <Pressable
      style={[styles.button, disabled && styles.buttonDisabled]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={typography.buttonText}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    backgroundColor: '#F4CE14',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#EDEFEE',
  },
});
