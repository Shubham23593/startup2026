import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { getEventsLive } from '../../services/firestoreService';
import EmptyState from '../../components/common/EmptyState';
import { useFocusEffect } from '@react-navigation/native';

export default function InternshipTrackerScreen() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const load = async () => {
    try { setLoading(true); const all = await getEventsLive(); setEvents(all.filter((e: any) => e.category === 'INTERNSHIP' || e.category === 'INTERVIEW')); } catch { setEvents([]); } finally { setLoading(false); }
  };
  useFocusEffect(useCallback(() => { load(); }, []));
  return (
    <View style={styles.c}>
      <Text style={styles.title}>Internship & Interview Tracker - Live</Text>
      {loading ? <ActivityIndicator color="#6750A4" /> : events.length === 0 ? <EmptyState icon="briefcase-outline" title="No internships tracked" desc="Track Applied -> Assessment -> Interview -> Offer -> Accepted/Rejected. Live data." /> : (
        <FlatList data={events} keyExtractor={i => i.id} renderItem={({ item }) => (
          <View style={styles.card}><Text style={{ fontWeight: 'bold' }}>{item.title}</Text><Text style={{ fontSize: 12, marginTop: 4 }}>Status: {item.status} • Priority: {item.priority}</Text><Text style={{ fontSize: 12, marginTop: 4 }}>Deadline: {new Date(item.deadline).toLocaleString()}</Text></View>
        )} />
      )}
    </View>
  );
}
const styles = StyleSheet.create({ c: { flex: 1, padding: 16, backgroundColor: '#FFFBFE' }, title: { fontWeight: 'bold', fontSize: 18 }, card: { backgroundColor: 'white', padding: 16, borderRadius: 16, marginTop: 12, elevation: 2 } });
