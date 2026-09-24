import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { getEventsLive } from '../../services/firestoreService';
import EmptyState from '../../components/common/EmptyState';
import { useFocusEffect } from '@react-navigation/native';

export default function AssignmentTrackerScreen() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const load = async () => {
    try { setLoading(true); const all = await getEventsLive(); setEvents(all.filter((e: any) => e.category === 'ASSIGNMENT')); } catch { setEvents([]); } finally { setLoading(false); }
  };
  useFocusEffect(useCallback(() => { load(); }, []));
  return (
    <View style={styles.c}>
      <Text style={styles.title}>Assignment Tracker - Live</Text>
      {loading ? <ActivityIndicator color="#6750A4" /> : events.length === 0 ? <EmptyState icon="book-outline" title="No assignments" desc="Create assignment deadlines with subject, professor, marks. Live from Firestore." /> : (
        <FlatList data={events} keyExtractor={i => i.id} renderItem={({ item }) => (
          <View style={styles.card}><Text style={{ fontWeight: 'bold' }}>{item.title}</Text><Text style={{ fontSize: 12, marginTop: 4 }}>{item.description}</Text><Text style={{ fontSize: 12, color: '#B3261E', marginTop: 4 }}>Due: {new Date(item.deadline).toLocaleString()} • {item.priority}</Text></View>
        )} />
      )}
    </View>
  );
}
const styles = StyleSheet.create({ c: { flex: 1, padding: 16, backgroundColor: '#FFFBFE' }, title: { fontWeight: 'bold', fontSize: 18 }, card: { backgroundColor: 'white', padding: 16, borderRadius: 16, marginTop: 12, elevation: 2 } });
