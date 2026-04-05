// screens/Profile.js

import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Image,
  StatusBar as RNStatusBar,
  Platform,
  View,
  Text,
  ScrollView,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { typography } from '../styles/typography';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import TertiaryButton from '../components/TertiaryButton';
import AppTextInput from '../components/AppTextInput';
import Checkbox from '../components/Checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

export default function Profile({ navigation, refreshOnboarding }) {
  const [notifications, setNotifications] = useState({
    orderStatuses: false,
    passwordChanges: false,
    specialOffers: false,
    newsletter: false,
  });

  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (Platform.OS === 'android') {
      RNStatusBar.setBackgroundColor('#495E57');
    }
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        const savedFirstName = await AsyncStorage.getItem('firstName');
        const savedEmail = await AsyncStorage.getItem('email');
        const savedPhone = await AsyncStorage.getItem('phone');
        const savedAvatar = await AsyncStorage.getItem('avatar');
        const savedNotifications = await AsyncStorage.getItem('notifications');

        if (savedFirstName) setFirstName(savedFirstName);
        if (savedEmail) setEmail(savedEmail);
        if (savedPhone) setPhone(savedPhone);
        if (savedAvatar) setAvatar(savedAvatar);
        if (savedNotifications)
          setNotifications(JSON.parse(savedNotifications));
      } catch (e) {
        console.log('Error loading profile', e);
      }
    };

    loadData();
  }, []);

  const toggleCheckbox = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const initials = firstName ? firstName[0].toUpperCase() : '';

  return (
    <>
      <SafeAreaView style={styles.safeAreaTop} edges={['top']}>
        <StatusBar style='light' backgroundColor='#495E57' />
      </SafeAreaView>

      <SafeAreaView style={styles.container} edges={['bottom']}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Pressable onPress={() => navigation.goBack()}>
              <Image source={require('../img/arrow-left.png')} />
            </Pressable>
            <Image style={styles.logo} source={require('../img/Logo.png')} />
            <Image source={require('../img/profile-picture.png')} />
          </View>
          <ScrollView style={{ width: '100%' }}>
            <View style={styles.personalInformationContainer}>
              <View style={{ marginTop: 0 }}>
                <Text style={typography.h2}>Personal Information</Text>
              </View>

              <View style={[styles.changeImageContainer, { marginTop: 16 }]}>
                {/* Avatar OR Initials */}
                {avatar ? (
                  <Image
                    style={styles.changeProfilePicture}
                    source={{ uri: avatar }}
                  />
                ) : (
                  <View style={styles.initialCircle}>
                    <Text style={styles.initialText}>{initials}</Text>
                  </View>
                )}

                {/* Buttons */}
                <View style={styles.buttonGroup}>
                  <SecondaryButton title='Change' onPress={pickImage} />
                  <TertiaryButton
                    title='Remove'
                    onPress={() => setAvatar(null)}
                  />
                </View>
              </View>

              <View style={{ marginTop: 24 }}>
                <View style={styles.textInputGroup}>
                  <AppTextInput
                    label='First Name'
                    placeholder='Enter your first name'
                    value={firstName}
                    onChangeText={setFirstName}
                  />
                  <AppTextInput
                    label='Last Name'
                    placeholder='Enter your last name'
                  />
                  <AppTextInput
                    label='Email'
                    value={email}
                    onChangeText={setEmail}
                    placeholder='Enter your email'
                  />
                  <AppTextInput
                    label='Phone Number'
                    value={phone}
                    onChangeText={setPhone}
                    placeholder='(123) 456-7890'
                    mask='(999) 999-9999'
                  />
                </View>
              </View>
              <View>
                <View style={styles.emailNotification}>
                  <Text style={typography.h3}>Email Notifications</Text>
                  <View style={styles.checkboxGroup}>
                    <Checkbox
                      label='Order statuses'
                      value={notifications.orderStatuses}
                      onToggle={() => toggleCheckbox('orderStatuses')}
                    />
                    <Checkbox
                      label='Password changes'
                      value={notifications.passwordChanges}
                      onToggle={() => toggleCheckbox('passwordChanges')}
                    />
                    <Checkbox
                      label='Special offers'
                      value={notifications.specialOffers}
                      onToggle={() => toggleCheckbox('specialOffers')}
                    />
                    <Checkbox
                      label='Newsletter'
                      value={notifications.newsletter}
                      onToggle={() => toggleCheckbox('newsletter')}
                    />
                  </View>
                </View>
              </View>
              <View style={{ marginTop: 24 }}>
                <PrimaryButton
                  title='Log out'
                  onPress={async () => {
                    try {
                      await AsyncStorage.clear();
                      refreshOnboarding(); // ✅ THIS is the fix
                    } catch (e) {
                      console.log('Error clearing storage', e);
                    }
                  }}
                />
              </View>
              <View style={[styles.buttonGroup2, { marginTop: 24 }]}>
                <TertiaryButton title='Discard changes' />
                <SecondaryButton
                  title='Save changes'
                  onPress={async () => {
                    try {
                      await AsyncStorage.setItem('firstName', firstName);
                      await AsyncStorage.setItem('email', email);
                      await AsyncStorage.setItem('phone', phone);
                      await AsyncStorage.setItem('avatar', avatar || '');
                      await AsyncStorage.setItem(
                        'notifications',
                        JSON.stringify(notifications),
                      );
                    } catch (e) {
                      console.log('Error saving profile', e);
                    }
                  }}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
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
  },

  content: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 0,
  },
  header: {
    direction: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
    paddingVertical: 24,
    paddingHorizontal: 25,
  },
  personalInformationContainer: {
    paddingHorizontal: 25,
    width: '100%',
  },
  changeImageContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  buttonGroup2: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInputGroup: {
    flexDirection: 'column',
    gap: 12,
  },
  emailNotification: {
    marginTop: 24,
  },

  checkboxGroup: {
    marginTop: 16,
    gap: 16,
  },

  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1.5,
    borderColor: '#495E57',
    borderRadius: 4,
    marginRight: 12,
  },

  checkboxChecked: {
    backgroundColor: '#495E57',
  },
  logo: {
    width: 185,
    height: 40,
    resizeMode: 'contain',
  },
  profilePicture: {
    width: 48,
    height: 48,
    resizeMode: 'contain',
  },
  changeProfilePicture: {
    width: 64,
    height: 64,
    resizeMode: 'contain',
  },
  initialCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#495E57',
    justifyContent: 'center',
    alignItems: 'center',
  },

  initialText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontFamily: 'Karla-Bold',
  },
});
