import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
} from 'react-native';

const Onboarding = ({ setIsOnboardingCompleted }) => {
  const [name, onChangeName] = useState('');
  const [email, onChangeEmail] = useState('');

  const isNameValid = name.trim().length > 0;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isFormValid = isNameValid && isEmailValid;

  return (
    <View style={styles.container}>
      <View style={styles.layout}>
        <View style={styles.header}>
          <Image style={styles.logo} source={require('../img/Logo.png')} />
        </View>
        <View style={styles.body}>
          <Text style={[styles.h1, styles.primaryGreen]}>
            Join Little Lemon
          </Text>
          <Text style={[styles.bodyText, { marginTop: 16 }]}>
            Create an account to get started
          </Text>
          <TextInput
            style={styles.input}
            placeholder='Enter your name'
            placeholderTextColor='#999999'
            value={name}
            onChangeText={onChangeName}
          />
          <TextInput
            style={{ ...styles.input, marginTop: 16 }}
            placeholder='Enter your email'
            placeholderTextColor='#999999'
            value={email}
            onChangeText={onChangeEmail}
            keyboardType='email-address'
            autoCapitalize='none'
          />

          <Pressable
            style={[styles.button, !isFormValid && styles.buttonDisabled]}
            disabled={!isFormValid}
            onPress={async () => {
              try {
                await AsyncStorage.setItem('onboardingCompleted', 'true');
                setIsOnboardingCompleted(true);
              } catch (e) {
                console.log('Error saving onboarding status', e);
              }
            }}
          >
            <Text style={styles.buttonText}>Next</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  layout: {
    marginHorizontal: 25,
    marginBottom: 184,
  },
  header: {
    marginTop: 94,
    marginHorizontal: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    marginTop: 32,
    flexDirection: 'column',
    alignItems: 'center',
  },
  logo: {
    width: 185,
    height: 40,
    resizeMode: 'contain',
  },
  h1: {
    fontFamily: 'MarkaziText-Medium',
    fontSize: 48,
    lineHeight: 48,
    letterSpacing: 0,
  },
  bodyText: {
    fontFamily: 'Karla-Regular',
    fontSize: 16,
    lineHeight: 16,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#333333',
  },
  primaryGreen: {
    color: '#495E57',
  },

  //   Input field
  input: {
    marginTop: 32,

    width: '100%',
    height: 48,

    backgroundColor: '#EDEFEE',
    borderColor: '#C4CBC8',
    borderWidth: 1,
    borderRadius: 12,

    paddingVertical: 11,
    paddingHorizontal: 12,

    fontFamily: 'Karla-Regular',
    fontSize: 16,
    color: '#999999',

    lineHeight: 24, // 150% of 16 = 24
    letterSpacing: -0.16, // -1% of 16
  },

  button: {
    marginTop: 287,

    width: '100%',
    height: 51,

    backgroundColor: '#F4CE14',

    paddingVertical: 16,
    paddingHorizontal: 12,

    borderRadius: 8,

    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    lineHeight: 16,
    letterSpacing: 0,
    justifyContent: 'center',
    fontWeight: '600',
  },

  buttonDisabled: {
    backgroundColor: '#C4CBC8',
  },
});
export default Onboarding;
