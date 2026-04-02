import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { typography } from '../styles/typography';
import SearchBar from './SearchBar';

export default function HeroBanner({ searchText, onSearchChange }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Little Lemon</Text>

      <View style={styles.row}>
        <View style={{ width: '60%' }}>
          <Text style={styles.subtitle}>Chicago</Text>

          <Text style={styles.description}>
            We are a family owned Mediterranean restaurant,
            focused on traditional recipes served with a modern twist.
          </Text>
        </View>

        <Image
          source={require('../img/HeroImage.png')}
          style={styles.image}
        />
      </View>

      <SearchBar
        value={searchText}
        onChangeText={onSearchChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#495E57',
    padding: 20,
    gap: 12,
  },

  title: {
    ...typography.h1,
    color: '#F4CE14',
  },

  subtitle: {
    ...typography.h2,
    color: '#FFFFFF',
  },

  description: {
    ...typography.body,
    color: '#FFFFFF',
    marginTop: 8,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  image: {
    width: 110,
    height: 130,
    borderRadius: 12,
  },
});