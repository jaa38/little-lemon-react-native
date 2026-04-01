import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { typography } from '../styles/typography';

export default function TertiaryButton({ title, onPress }) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={[typography.buttonText, {color: '#495E57'} ]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 32,

    backgroundColor: '#FFFFFF',

    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#495E57',

    paddingHorizontal: 12,

    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    fontSize: 14,
    fontWeight: '600',
    color: '#495E57',
    textAlign: 'center',
  },
});