import React, { useEffect } from 'react';
import {
  StyleSheet,
  Image,
  StatusBar as RNStatusBar,
  Platform,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

export default function SplashScreen({ onFinish }) {
  useEffect(() => {
    if (Platform.OS === 'android') {
      RNStatusBar.setBackgroundColor('#495E57');
    }

    // ⏱️ Timer (2 seconds)
    const timer = setTimeout(() => {
      onFinish();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <SafeAreaView style={styles.safeAreaTop} edges={['top']}>
        <StatusBar style="light" backgroundColor="#495E57" />
      </SafeAreaView>

      <View style={styles.container}>
        <Image
          source={require('../img/splashLogo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  safeAreaTop: {
    backgroundColor: '#495E57',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  },
});