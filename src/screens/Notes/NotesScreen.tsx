import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { getNotesLive, createNoteLive } from '../../services/firestoreService';
import EmptyState from '../../components/common/EmptyState';
import { useFocusEffect } from '@react-navigation/native';

export default function NotesScreen() {
  const [notes, setNotes] = useState<any[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try { setLoading(true); const data = await getNotesLive(); setNotes(data); } catch { setNotes([]); } finally { setLoading(false); }
  };
  useFocusEffect(useCallback(() => { load(); }, []));

  const addNote = async () => {
    if (!title.trim()) return;
    await createNoteLive({ title: title.trim(), content: content.trim() });
    setTitle(''); setContent(''); load();
  };

  return (
    <View style={styles.c}>
      <TextInput placeholder="Note title" value={title} onChangeText={setTitle} style={styles.input} placeholderTextColor="#999" />
      <TextInput placeholder="Content..." value={content} onChangeText={setContent} style={[styles.input, { height: 80 }]} multiline placeholderTextColor="#999" />
      <TouchableOpacity style={styles.btn} onPress={addNote}><Text style={{ color: 'white', fontWeight: 'bold' }}>Save Note Live</Text></TouchableOpacity>
      {loading ? <ActivityIndicator color="#6750A4" style={{ marginTop: 20 }} /> : notes.length === 0 ? <EmptyState icon="notebook-outline" title="No notes yet" desc="Create quick notes, checklists. Works offline." /> : (
        <FlatList data={notes} keyExtractor={i => i.id} renderItem={({ item }) => (
          <View style={styles.card}><Text style={{ fontWeight: 'bold' }}>{item.title}</Text><Text style={{ marginTop: 4, color: '#49454F' }}>{item.content}</Text></View>
        )} />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  c: { flex: 1, padding: 16, backgroundColor: '#FFFBFE' },
  input: { backgroundColor: 'white', padding: 16, borderRadius: 16, borderWidth: 1, borderColor: '#E7E0EC', marginBottom: 8, color: '#000' },
  btn: { backgroundColor: '#6750A4', padding: 16, borderRadius: 16, alignItems: 'center' },
  card: { backgroundColor: 'white', padding: 16, borderRadius: 16, marginTop: 8, elevation: 1 },
});
