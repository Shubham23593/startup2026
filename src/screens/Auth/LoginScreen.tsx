import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
      navigation.navigate('MainTabs' as never);
    } catch (e: any) {
      // For demo, allow without firebase
      if (email) navigation.navigate('MainTabs' as never);
      else Alert.alert('Error', e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to DeadlineHub AI</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
      <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} style={styles.input} />
      <TouchableOpacity style={styles.btn} onPress={handleLogin}>
        <Text style={styles.btnText}>Login / Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.googleBtn} onPress={() => navigation.navigate('MainTabs' as never)}>
        <Text style={styles.googleText}>Continue with Google (Demo)</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center', backgroundColor: '#FFFBFE' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 24 },
  input: { backgroundColor: 'white', padding: 16, borderRadius: 16, marginBottom: 12, borderWidth: 1, borderColor: '#E7E0EC' },
  btn: { backgroundColor: '#6750A4', padding: 16, borderRadius: 16, alignItems: 'center', marginTop: 12 },
  btnText: { color: 'white', fontWeight: 'bold' },
  googleBtn: { padding: 16, borderRadius: 16, alignItems: 'center', marginTop: 12, borderWidth: 1, borderColor: '#6750A4' },
  googleText: { color: '#6750A4', fontWeight: 'bold' },
});
