import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
export default function HackathonTrackerScreen(){ return <View style={styles.c}><Text style={styles.title}>Hackathon Tracker</Text>{['Registration','Round 1','PPT','Prototype','Demo','Final','Winner'].map((s,i)=><View key={s} style={styles.step}><Text>{i+1}. {s} - {i<2?'✅': '⏳'}</Text></View>)}</View>; }
const styles = StyleSheet.create({c:{flex:1, padding:16}, title:{fontWeight:'bold', fontSize:18}, step:{padding:12, backgroundColor:'white', borderRadius:12, marginTop:8}});
