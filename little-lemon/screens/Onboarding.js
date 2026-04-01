import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar as RNStatusBar,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { typography } from '../styles/typography';
import CustomTextInput from '../components/CustomTextInput';
import PrimaryButton from '../components/PrimaryButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Onboarding({ onComplete }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // ✅ Android status bar fix
  useEffect(() => {
    if (Platform.OS === 'android') {
      RNStatusBar.setBackgroundColor('#495E57');
    }
  }, []);

  // ✅ Validation
  const isNameValid = name.trim().length > 0 && /^[A-Za-z\s]+$/.test(name);


  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isFormValid = isNameValid && isEmailValid;

  return (
    <>
      <SafeAreaView style={styles.safeAreaTop} edges={['top']}>
        <StatusBar style='light' backgroundColor='#495E57' />
      </SafeAreaView>

      {/* ✅ MAIN APP (white) */}
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <View style={styles.content}>
          <Image source={require('../img/Logo.png')} style={styles.logo} />

          <Text style={[typography.h1, styles.title]}>
            Welcome to Little Lemon
          </Text>

          <Text style={[typography.body, styles.subtitle]}>
            Create an account to get started
          </Text>

          <View style={styles.inputContainer}>
            <CustomTextInput
              placeholder='Enter your name'
              value={name}
              onChangeText={setName}
            />

            <CustomTextInput
              placeholder='Enter your email'
              value={email}
              onChangeText={setEmail}
              keyboardType='email-address'
              autoCapitalize='none'
            />
          </View>

          <View style={styles.buttonContainer}>
            <PrimaryButton
              title='Next'
              disabled={!isFormValid}
              onPress={async () => {
                try {
                  await AsyncStorage.setItem('firstName', name);
                  await AsyncStorage.setItem('email', email);
                  await AsyncStorage.setItem('onboardingCompleted', 'true');

                  onComplete(); // ✅ THIS is the fix
                } catch (e) {
                  console.log('Error saving data', e);
                }
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  // ✅ Only top (status bar area)
  safeAreaTop: {
    backgroundColor: '#495E57',
  },

  // ✅ Main app background
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  content: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 16,
  },

  logo: {
    marginTop: 32,
  },

  title: {
    textAlign: 'center',
    color: '#495E57',
    marginTop: 32,
  },

  subtitle: {
    textAlign: 'center',
    color: '#333333',
    marginTop: 16,
  },

  inputContainer: {
    width: '100%',
    marginTop: 32,
    gap: 16,
  },

  buttonContainer: {
    width: '100%',
    marginTop: 32,
  },
});
