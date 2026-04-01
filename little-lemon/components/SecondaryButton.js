import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { typography } from '../styles/typography';

export default function SecondaryButton({ title, onPress }) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={[typography.buttonText, { color: '#FFFFFF' }]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 32,
    backgroundColor: '#495E57',
    borderRadius: 8,

    paddingHorizontal: 12,

    alignItems: 'center',
    justifyContent: 'center',
  },

});