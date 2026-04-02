import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Pressable,
} from 'react-native';

export default function Header({ navigation }) {
  return (
    <View style={styles.header}>
      {/* ✅ Logo */}
      <Image
        style={styles.logo}
        source={require('../img/Logo.png')}
      />

      {/* ✅ Avatar */}
      <Pressable
        onPress={() => navigation.navigate('Profile')}
        style={styles.avatarWrapper}
      >
        <Image
          style={styles.profileImage}
          source={require('../img/profile-picture.png')}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
  },

  logo: {
    height: 40,
    resizeMode: 'contain',
  },

  avatarWrapper: {
    padding: 4,
  },

  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});