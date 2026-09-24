import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
export default function InternshipTrackerScreen(){ return <View style={styles.c}><Text style={styles.title}>Internship Tracker</Text><View style={styles.card}><Text>Company: Google, Applied: 10 Sept, Status: Interview, Offer: Pending</Text></View></View>; }
const styles = StyleSheet.create({c:{flex:1, padding:16}, title:{fontWeight:'bold'}, card:{backgroundColor:'white', padding:16, borderRadius:16, marginTop:12}});
