import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { typography } from '../styles/typography';
import { ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaskedTextInput } from 'react-native-mask-text';
import * as ImagePicker from 'expo-image-picker';

const Profile = ({ navigation }) => {
  const [isFocused, setIsFocused] = useState(null);

  //Input Forms
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, onChangeEmail] = useState('');
  const [phoneNumber, onChangePhoneNumber] = useState('');

  // Image Picker
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const initials =
    (firstName?.[0] || '').toUpperCase() + (lastName?.[0] || '').toUpperCase();

  // Form Validation
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPhoneNumberValid = /^\(\d{3}\)\s\d{3}-\d{4}$/.test(phoneNumber);
  const isFormValid =
    firstName.trim().length > 0 &&
    lastName.trim().length > 0 &&
    isEmailValid &&
    isPhoneNumberValid;

  const [notifications, setNotifications] = useState({
    orderStatuses: false,
    passwordChanges: false,
    specialOffers: false,
    newsletter: false,
  });

  const toggleCheckbox = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const loadData = async () => {
    const firstName = await AsyncStorage.getItem('firstName');
    const lastName = await AsyncStorage.getItem('lastName');
    const email = await AsyncStorage.getItem('email');
    const phoneNumber = await AsyncStorage.getItem('phoneNumber');
    const avatar = await AsyncStorage.getItem('avatar');
    const savedNotifications = await AsyncStorage.getItem('notifications');

    if (firstName) setFirstName(firstName);
    if (lastName) setLastName(lastName);
    if (email) onChangeEmail(email);
    if (phoneNumber) onChangePhoneNumber(phoneNumber);
    if (avatar) setImage(avatar);
    if (savedNotifications) setNotifications(JSON.parse(savedNotifications));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSave = async () => {
    await AsyncStorage.setItem('firstName', firstName);
    await AsyncStorage.setItem('lastName', lastName);
    await AsyncStorage.setItem('email', email);
    await AsyncStorage.setItem('phoneNumber', phoneNumber);
    await AsyncStorage.setItem('notifications', JSON.stringify(notifications));

    if (image) {
      await AsyncStorage.setItem('avatar', image);
    }

    alert('Changes saved ✅');
  };

  const handleLogout = async () => {
    await AsyncStorage.clear();
    navigation.replace('Onboarding');
  };

  return (
    <>
      <StatusBar style='light' />

      <SafeAreaView edges={['top']} style={styles.topSafeArea} />
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            style={styles.backArrow}
            source={require('../img/arrow-left.png')}
          />
          <Image style={styles.logo} source={require('../img/Logo.png')} />
          <Image
            style={styles.profileImage}
            source={require('../img/profile-picture.png')}
          />
        </View>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <View style={styles.personalInfo}>
              <Text style={[typography.h2, { color: '#000000' }]}>
                Personal Information
              </Text>
              <View style={styles.imageNButtons}>
                <View>
                  <Pressable onPress={pickImage} style={styles.profileImage2}>
                    {image ? (
                      <Image
                        source={{ uri: image }}
                        style={styles.profileImage2}
                      />
                    ) : (
                      <View style={styles.initialsContainer}>
                        <Text style={styles.initialsText}>{initials}</Text>
                      </View>
                    )}
                  </Pressable>
                </View>
                <View style={styles.buttonGroup}>
                  <Pressable style={styles.buttonSecondary} onPress={pickImage}>
                    <Text style={styles.buttonSecondaryText}>Change</Text>
                  </Pressable>
                  <Pressable
                    style={styles.buttonTertiary}
                    onPress={() => setImage(null)}
                  >
                    <Text style={styles.buttonTertiaryText}>Remove</Text>
                  </Pressable>
                </View>
              </View>
              <View style={styles.inputField}>
                <View style={styles.inputWrapper}>
                  <Text style={styles.label}>First name</Text>
                  <TextInput
                    style={[
                      styles.input,
                      isFocused === 'firstName' && styles.inputActive,
                    ]}
                    placeholder='Enter your first name'
                    placeholderTextColor='#999999'
                    onFocus={() => setIsFocused('firstName')}
                    onBlur={() => setIsFocused(null)}
                    value={firstName}
                    onChangeText={setFirstName}
                  />
                </View>
              </View>
              <View style={styles.inputWrapper}>
                <Text style={styles.label}>Last name</Text>

                <TextInput
                  style={[
                    styles.input,
                    isFocused === 'lastName' && styles.inputActive,
                  ]}
                  placeholder='Enter your last name'
                  placeholderTextColor='#999999'
                  onFocus={() => setIsFocused('lastName')}
                  onBlur={() => setIsFocused(null)}
                  value={lastName}
                  onChangeText={setLastName}
                />
              </View>
              <View style={styles.inputWrapper}>
                <Text style={styles.label}>Email</Text>

                <TextInput
                  style={[
                    styles.input,
                    isFocused === 'email' && styles.inputActive,
                  ]}
                  placeholder='Enter your email address'
                  placeholderTextColor='#999999'
                  onFocus={() => setIsFocused('email')}
                  onBlur={() => setIsFocused(null)}
                  value={email}
                  onChangeText={onChangeEmail}
                  keyboardType='email-address'
                  autoCapitalize='none'
                />
              </View>
              <View style={styles.inputWrapper}>
                <Text style={styles.label}>Phone number</Text>

                <MaskedTextInput
                  mask='(999) 999-9999'
                  value={phoneNumber}
                  onChangeText={onChangePhoneNumber}
                  style={[
                    styles.input,
                    isFocused === 'phone' && styles.inputActive,
                  ]}
                  placeholder='Enter your phone number'
                  placeholderTextColor='#999999'
                  keyboardType='phone-pad'
                  onFocus={() => setIsFocused('phone')}
                  onBlur={() => setIsFocused(null)}
                />
              </View>
            </View>
            <View style={styles.emailNotification}>
              <Text style={[typography.h3, { color: '#000000' }]}>
                Email Notifications
              </Text>
              <View style={styles.checkboxGroup}>
                <Pressable
                  style={styles.checkboxRow}
                  onPress={() => toggleCheckbox('orderStatuses')}
                >
                  <View
                    style={[
                      styles.checkbox,
                      notifications.orderStatuses &&
                        styles.checkboxChecked,
                    ]}
                  />
                  <Text style={typography.body}>Order statuses</Text>
                </Pressable>

                <Pressable
                  style={styles.checkboxRow}
                  onPress={() => toggleCheckbox('passwordChanges')}
                >
                  <View
                    style={[
                      styles.checkbox,
                      notifications.passwordChanges &&
                        styles.checkboxChecked,
                    ]}
                  />
                  <Text style={typography.body}>Password changes</Text>
                </Pressable>

                <Pressable
                  style={styles.checkboxRow}
                  onPress={() => toggleCheckbox('specialOffers')}
                >
                  <View
                    style={[
                      styles.checkbox,
                      notifications.specialOffers &&
                        styles.checkboxChecked,
                    ]}
                  />
                  <Text style={typography.body}>Special offers</Text>
                </Pressable>

                <Pressable
                  style={styles.checkboxRow}
                  onPress={() => toggleCheckbox('newsletter')}
                >
                  <View
                    style={[
                      styles.checkbox,
                      notifications.newsletter && styles.checkboxChecked,
                    ]}
                  />
                  <Text style={typography.body}>Newsletter</Text>
                </Pressable>
              </View>
            </View>
            <View style={styles.logOutButton}>
              <Pressable style={styles.buttonPrimary} onPress={handleLogout}>
                <Text style={styles.buttonText}>Logout</Text>
              </Pressable>
            </View>
            <View style={styles.editButtonGroup}>
              <View style={styles.buttonGroup2}>
                <Pressable
                  style={styles.buttonTertiary}
                  onPress={() => loadData()}
                >
                  <Text style={styles.buttonTertiaryText}>Discard Changes</Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.buttonSecondary,
                    !isFormValid && styles.buttonDisabled,
                  ]}
                  disabled={!isFormValid}
                  onPress={handleSave}
                >
                  <Text style={styles.buttonSecondaryText}>Save changes</Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  topSafeArea: {
    backgroundColor: '#495E57',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 25,
    paddingVertical: 20,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    marginTop: 26,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  personalInfo: {
    marginTop: 12,
  },
  // Input Fields section
  inputField: {
    marginTop: 26,
  },
  label: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: -0.12,
    color: '#495E57',
    marginBottom: 6,
  },

  // 📦 Input container
  inputWrapper: {
    width: '100%',
    marginBottom: 12,
  },

  // ✏️ Input (inactive)
  input: {
    height: 48,
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 11,
    fontFamily: 'Karla-Regular',
    fontSize: 16,
    lineHeight: 24, // 👈 150% of 16
    letterSpacing: -0.16, // 👈 -1% of 16
    backgroundColor: '#FFFFFF',
    color: '#999999',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#C4CBC8',
    justifyContent: 'center',
  },

  // ✏️ Input (active / focused)
  inputActive: {
    backgroundColor: '#EDEFEE',
    color: '#333333',
  },

  // Email Notification Section
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

  //Log out Button
  logOutButton: {
    marginTop: 32,
  },

  // Discard and Save Changes
  editButtonGroup: {
    marginTop: 24,
  },

  backArrow: {
    height: 48,
    width: 48,
    resizeMode: 'contain',
  },
  logo: {
    width: 185,
    height: 40,
    resizeMode: 'contain',
  },
  profileImage: {
    height: 48,
    width: 48,
    resizeMode: 'contain',
  },
  profileImage2: {
    height: 64,
    width: 64,
    resizeMode: 'contain',
  },
  h2: {
    fontFamily: 'MarkaziText-Medium',
    fontWeight: '500',
    fontSize: 28,
    lineHeight: 32,
    letterSpacing: 0,
    color: '#333333',
  },
  text: {
    fontSize: 18,
    color: '#333333',
  },
  imageNButtons: {
    flexDirection: 'row',
    alignItems: 'left',
    gap: 16,
    marginTop: 16,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16,
  },

  buttonGroup2: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },

  buttonPrimary: {
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
  // 🔘 Secondary Button (filled)

  buttonSecondary: {
    height: 48,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#495E57',
    borderRadius: 8,
  },

  buttonSecondaryText: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0,
    fontFamily: 'Inter-SemiBold',
  },

  // 🔘 Tertiary Button (outlined)
  buttonTertiary: {
    height: 48,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#495E57',
    borderRadius: 8,
  },

  buttonTertiaryText: {
    color: '#495E57',
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0,
    fontFamily: 'Inter-SemiBold',
  },

  initialsContainer: {
    height: 64,
    width: 64,
    borderRadius: 32,
    backgroundColor: '#495E57',
    justifyContent: 'center',
    alignItems: 'center',
  },

  initialsText: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Karla-Bold',
  },
});
