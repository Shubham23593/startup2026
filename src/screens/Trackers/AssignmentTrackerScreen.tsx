import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
export default function AssignmentTrackerScreen(){ return <View style={styles.c}><Text style={styles.title}>Assignment Tracker</Text><View style={styles.card}><Text>Subject: DBMS, Prof: Sharma, Due: Tomorrow, Marks: 20</Text></View></View>; }
const styles = StyleSheet.create({c:{flex:1, padding:16}, title:{fontWeight:'bold'}, card:{backgroundColor:'white', padding:16, borderRadius:16, marginTop:12}});
