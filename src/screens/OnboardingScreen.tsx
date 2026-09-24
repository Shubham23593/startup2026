import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

export default function OnboardingScreen() {
  const navigation = useNavigation();
  return (
    <LinearGradient colors={['#FFFBFE', '#EADDFF']} style={styles.container}>
      <Text style={styles.title}>All Deadlines in One Place</Text>
      <Text style={styles.desc}>Hackathons, Assignments, Internships, Interviews - Never miss again with AI.</Text>
      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Login' as never)}>
        <LinearGradient colors={['#6750A4', '#7D5260']} style={styles.btnGrad}>
          <Text style={styles.btnText}>Get Started</Text>
        </LinearGradient>
      </TouchableOpacity>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#1C1B1F' },
  desc: { fontSize: 16, color: '#49454F', marginTop: 12, lineHeight: 22 },
  btn: { marginTop: 32, borderRadius: 16, overflow: 'hidden' },
  btnGrad: { padding: 16, alignItems: 'center', borderRadius: 16 },
  btnText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});
