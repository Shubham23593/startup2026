import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
export default function EventDetailScreen(){ return <View style={styles.c}><Text style={styles.title}>Google Girl Hackathon</Text><Text>Remaining: 2 Days 6 Hours - Animated Countdown</Text><Text>Priority: URGENT, Status: PENDING</Text></View>; }
const styles = StyleSheet.create({c:{flex:1, padding:16}, title:{fontSize:22, fontWeight:'bold'}});
