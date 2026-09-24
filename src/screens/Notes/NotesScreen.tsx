import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
export default function NotesScreen(){ return <View style={styles.c}><Text style={styles.title}>Notes - Quick, Rich Text, Checklist, Folders, Pinned</Text><View style={styles.card}><Text>Pinned: SIH Idea - AI for farmers</Text></View></View>; }
const styles = StyleSheet.create({c:{flex:1, padding:16}, title:{fontWeight:'bold', fontSize:16}, card:{backgroundColor:'white', padding:16, borderRadius:16, marginTop:12, elevation:2}});
