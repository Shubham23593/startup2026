import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';

export default function SplashScreen() {
  const navigation = useNavigation();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Onboarding' as never);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <LinearGradient colors={['#6750A4', '#7D5260']} style={styles.container}>
      <Text style={styles.logo}>DeadlineHub AI</Text>
      <Text style={styles.tagline}>Never Miss a Deadline Again.</Text>
      <View style={{ width: 200, height: 200, marginTop: 20 }}>
        {/* Add lottie file in assets */}
      </View>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  logo: { fontSize: 32, fontWeight: 'bold', color: 'white', letterSpacing: 1 },
  tagline: { fontSize: 16, color: 'rgba(255,255,255,0.8)', marginTop: 8 },
});
