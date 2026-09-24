import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { getEventsLive, getTasksLive } from '../../services/firestoreService';
import { useFocusEffect } from '@react-navigation/native';

export default function StatisticsScreen() {
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0, urgent: 0, tasks: 0 });
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setLoading(true);
      const events = await getEventsLive();
      const tasks = await getTasksLive();
      setStats({
        total: events.length,
        completed: events.filter((e: any) => e.status === 'COMPLETED').length,
        pending: events.filter((e: any) => e.status === 'PENDING').length,
        urgent: events.filter((e: any) => e.priority === 'URGENT').length,
        tasks: tasks.length,
      });
    } catch {
      setStats({ total: 0, completed: 0, pending: 0, urgent: 0, tasks: 0 });
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(useCallback(() => { load(); }, []));

  return (
    <ScrollView style={styles.c}>
      <Text style={styles.title}>Statistics - Live From Your Data</Text>
      <Text style={styles.desc}>No demo - Real counts from Firestore</Text>
      {loading ? <ActivityIndicator color="#6750A4" style={{ marginTop: 20 }} /> : (
        <>
          <View style={styles.row}>
            <View style={[styles.card, { backgroundColor: '#EADDFF' }]}><Text style={styles.num}>{stats.total}</Text><Text>Total Deadlines</Text></View>
            <View style={[styles.card, { backgroundColor: '#C2E8FF' }]}><Text style={styles.num}>{stats.completed}</Text><Text>Completed</Text></View>
          </View>
          <View style={styles.row}>
            <View style={[styles.card, { backgroundColor: '#FFDAD6' }]}><Text style={styles.num}>{stats.urgent}</Text><Text>Urgent</Text></View>
            <View style={[styles.card, { backgroundColor: '#E7E0EC' }]}><Text style={styles.num}>{stats.pending}</Text><Text>Pending</Text></View>
          </View>
          <View style={[styles.bigCard, { backgroundColor: 'white' }]}>
            <Text style={{ fontWeight: 'bold' }}>Productivity</Text>
            <Text style={{ marginTop: 8 }}>Tasks: {stats.tasks} • Completion: {stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}%</Text>
            <View style={styles.bar}><View style={[styles.fill, { width: `${stats.total > 0 ? (stats.completed / stats.total) * 100 : 0}%` }]} /></View>
          </View>
        </>
      )}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  c: { flex: 1, padding: 16, backgroundColor: '#FFFBFE' },
  title: { fontWeight: 'bold', fontSize: 18 },
  desc: { fontSize: 12, color: '#666', marginTop: 4 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 },
  card: { width: '47%', borderRadius: 16, padding: 20, alignItems: 'center', elevation: 2 },
  num: { fontSize: 28, fontWeight: 'bold' },
  bigCard: { borderRadius: 16, padding: 16, marginTop: 16, elevation: 2 },
  bar: { height: 8, backgroundColor: '#E7E0EC', borderRadius: 4, marginTop: 12 },
  fill: { height: 8, backgroundColor: '#6750A4', borderRadius: 4 },
});
