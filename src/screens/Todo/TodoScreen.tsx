import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
export default function TodoScreen() {
  const [tasks, setTasks] = useState([{id:'1', title:'DBMS Assignment', done:false}, {id:'2', title:'SIH PPT', done:true}]);
  const [text, setText] = useState('');
  return <View style={styles.c}><TextInput placeholder="New Task" value={text} onChangeText={setText} style={styles.input}/><TouchableOpacity style={styles.btn} onPress={()=>{setTasks([...tasks,{id:Date.now().toString(), title:text, done:false}]); setText('');}}><Text style={{color:'white'}}>Add</Text></TouchableOpacity><FlatList data={tasks} renderItem={({item}) => <View style={styles.task}><Text style={{textDecorationLine: item.done?'line-through': 'none'}}>{item.title}</Text></View>} /></View>;
}
const styles = StyleSheet.create({c:{flex:1, padding:16}, input:{backgroundColor:'white', padding:16, borderRadius:16, borderWidth:1, borderColor:'#E7E0EC'}, btn:{backgroundColor:'#6750A4', padding:16, borderRadius:16, alignItems:'center', marginTop:8}, task:{padding:16, backgroundColor:'white', borderRadius:12, marginTop:8}});
