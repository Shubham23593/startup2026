import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { getTasksLive, createTaskLive, toggleTaskComplete } from '../../services/firestoreService';
import EmptyState from '../../components/common/EmptyState';
import { useFocusEffect } from '@react-navigation/native';

export default function TodoScreen() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try { setLoading(true); const data = await getTasksLive(); setTasks(data); } catch { setTasks([]); } finally { setLoading(false); }
  };
  useFocusEffect(useCallback(() => { load(); }, []));

  const addTask = async () => {
    if (!text.trim()) return;
    await createTaskLive({ title: text.trim(), priority: 'MEDIUM' });
    setText('');
    load();
  };

  return (
    <View style={styles.c}>
      <View style={styles.inputRow}>
        <TextInput placeholder="New task - e.g. Complete DBMS report" value={text} onChangeText={setText} style={styles.input} placeholderTextColor="#999" />
        <TouchableOpacity style={styles.btn} onPress={addTask}><Text style={{ color: 'white', fontWeight: 'bold' }}>Add</Text></TouchableOpacity>
      </View>
      {loading ? <ActivityIndicator color="#6750A4" style={{ marginTop: 20 }} /> : tasks.length === 0 ? <EmptyState icon="check-circle-outline" title="No tasks yet" desc="Add your first task. Works offline, auto syncs when online." /> : (
        <FlatList data={tasks} keyExtractor={i => i.id} renderItem={({ item }) => (
          <TouchableOpacity style={styles.task} onPress={async () => { await toggleTaskComplete(item.id, item.isCompleted); load(); }}>
            <Text style={{ textDecorationLine: item.isCompleted ? 'line-through' : 'none', flex: 1 }}>{item.title}</Text>
            <Text>{item.isCompleted ? '✅' : '⬜'}</Text>
          </TouchableOpacity>
        )} />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  c: { flex: 1, padding: 16, backgroundColor: '#FFFBFE' },
  inputRow: { flexDirection: 'row' },
  input: { flex: 1, backgroundColor: 'white', padding: 16, borderRadius: 16, borderWidth: 1, borderColor: '#E7E0EC', color: '#000' },
  btn: { backgroundColor: '#6750A4', padding: 16, borderRadius: 16, alignItems: 'center', marginLeft: 8, justifyContent: 'center' },
  task: { padding: 16, backgroundColor: 'white', borderRadius: 16, marginTop: 8, flexDirection: 'row', justifyContent: 'space-between', elevation: 1 },
});
