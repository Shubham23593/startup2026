import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
export default function StatisticsScreen(){ return <View style={styles.c}><Text style={styles.title}>Statistics - Beautiful Charts</Text><View style={styles.chart}><Text>Upcoming: 5, Completed: 12, Missed: 2</Text></View></View>; }
const styles = StyleSheet.create({c:{flex:1, padding:16}, title:{fontWeight:'bold'}, chart:{height:200, backgroundColor:'white', borderRadius:16, marginTop:12, justifyContent:'center', alignItems:'center'}});
