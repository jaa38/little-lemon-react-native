import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function SearchBar() {
  const [value, setValue] = useState('');

  const handleClear = () => {
    setValue('');
  };

  return (
    <View style={styles.container}>
      {/* 🔍 Search Icon */}
      <Ionicons
        name='search'
        size={20}
        color='#495E57'
        style={styles.searchIcon}
      />

      {/* ✍🏽 Input */}
      <TextInput
        placeholder='Search menu...'
        placeholderTextColor='#999'
        value={value}
        onChangeText={setValue}
        style={styles.input}
        returnKeyType='search'
      />

      {/* ❌ Clear Button */}
      {value.length > 0 && (
        <Pressable onPress={handleClear}>
          <Ionicons name='close-circle' size={20} color='#495E57' />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%', // ✅ Full width container
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EDEFEE',
    borderRadius: 24,
    paddingHorizontal: 14,
    height: 44,
    marginTop: 16,
  },
  searchIcon: {
    marginRight: 8, // ✅ Proper spacing
  },
  input: {
    flex: 1, // ✅ Takes remaining space (correct way)
    fontSize: 16,
    color: '#333333',
  },
});
