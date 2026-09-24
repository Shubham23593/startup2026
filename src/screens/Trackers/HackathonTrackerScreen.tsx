import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { getEventsLive } from '../../services/firestoreService';
import EmptyState from '../../components/common/EmptyState';
import { useFocusEffect } from '@react-navigation/native';

export default function HackathonTrackerScreen() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try { setLoading(true); const all = await getEventsLive(); setEvents(all.filter((e: any) => e.category === 'HACKATHON')); } catch { setEvents([]); } finally { setLoading(false); }
  };
  useFocusEffect(useCallback(() => { load(); }, []));

  const steps = ['Registration', 'Round 1', 'PPT', 'Prototype', 'Demo', 'Final', 'Winner'];

  return (
    <View style={styles.c}>
      <Text style={styles.title}>Hackathon Tracker - Live</Text>
      {loading ? <ActivityIndicator color="#6750A4" /> : events.length === 0 ? <EmptyState icon="trophy-outline" title="No hackathons tracked" desc="Create a hackathon event to track Registration -> PPT -> Demo -> Winner flow." /> : (
        <FlatList data={events} keyExtractor={i => i.id} renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
            <Text style={{ fontSize: 12, color: '#666', marginTop: 4 }}>Status: {item.status}</Text>
            <View style={{ marginTop: 12 }}>{steps.map((s, i) => <Text key={s} style={{ fontSize: 12, marginTop: 4 }}>{i < 2 ? '✅' : '⏳'} {s}</Text>)}</View>
          </View>
        )} />
      )}
    </View>
  );
}
const styles = StyleSheet.create({ c: { flex: 1, padding: 16, backgroundColor: '#FFFBFE' }, title: { fontWeight: 'bold', fontSize: 18 }, card: { backgroundColor: 'white', padding: 16, borderRadius: 16, marginTop: 12, elevation: 2 } });
