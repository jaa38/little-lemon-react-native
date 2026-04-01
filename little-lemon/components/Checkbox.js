import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { typography } from '../styles/typography';

const Checkbox = ({ label, value, onToggle }) => {
  return (
    <Pressable style={styles.row} onPress={onToggle}>
      <View style={[styles.box, value && styles.checked]}>
        {value && <Text style={styles.check}>✓</Text>}
      </View>

      <Text style={typography.body}>{label}</Text>
    </Pressable>
  );
};

export default Checkbox;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  box: {
    width: 20,
    height: 20,
    borderWidth: 1.5,
    borderColor: '#495E57',
    borderRadius: 4,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  checked: {
    backgroundColor: '#495E57',
  },

  check: {
    color: '#fff',
    fontSize: 12,
  },
});