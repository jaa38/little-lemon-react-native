import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const Splash = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../img/splashLogo.png')} />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', //
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 96,
    width: 352,
    resizeMode: 'contain',
  },
});
