import { Pressable, Text, StyleSheet } from 'react-native';

export default function UICard({ label, onPress, isActive }) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.card,
        isActive && styles.activeCard
      ]}
    >
      <Text style={[
        styles.text,
        isActive && styles.activeText
      ]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: '#EDEFEE',
  },

  activeCard: {
    backgroundColor: '#495E57',
  },

  text: {
    fontFamily: 'MarkaziText-Medium',
    fontSize: 16,
    color: '#333333',
  },

  activeText: {
    color: '#FFFFFF',
  },
});