import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function EmptyState({ icon, title, desc, actionText, onAction }: any) {
  return (
    <View style={styles.container}>
      <Icon name={icon || 'calendar-blank'} size={64} color="#CAC4D0" />
      <Text style={styles.title}>{title || 'No data yet'}</Text>
      <Text style={styles.desc}>{desc || 'Create your first item to get started. Works offline too.'}</Text>
      {actionText && (
        <TouchableOpacity style={styles.btn} onPress={onAction}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>{actionText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: { backgroundColor: 'white', margin: 16, borderRadius: 24, padding: 32, alignItems: 'center', elevation: 2 },
  title: { fontSize: 18, fontWeight: 'bold', marginTop: 16, color: '#1C1B1F' },
  desc: { fontSize: 14, color: '#49454F', textAlign: 'center', marginTop: 8, lineHeight: 20 },
  btn: { backgroundColor: '#6750A4', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 16, marginTop: 16 },
});
