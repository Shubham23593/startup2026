import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
export default function SettingsScreen(){ return <View style={styles.c}><Text style={styles.title}>Settings</Text><View style={styles.row}><Text>Dark Mode</Text><Switch /></View><View style={styles.row}><Text>Notifications</Text><Switch value={true}/></View><Text>Cloud Backup - Firebase, Offline Sync - WatermelonDB</Text></View>; }
const styles = StyleSheet.create({c:{flex:1, padding:16}, title:{fontWeight:'bold', fontSize:18}, row:{flexDirection:'row', justifyContent:'space-between', padding:16, backgroundColor:'white', borderRadius:12, marginTop:12}});
