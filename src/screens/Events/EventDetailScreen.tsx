import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { getCurrentUserId } from '../../services/firebase';
import { format } from 'date-fns';

export default function EventDetailScreen({ route, navigation }: any) {
  const { eventId } = route.params;
  const [event, setEvent] = useState<any>(null);

  useEffect(() => {
    async function load() {
      try {
        const userId = await getCurrentUserId();
        const doc = await firestore().collection('users').doc(userId).collection('events').doc(eventId).get();
        setEvent({ id: doc.id, ...doc.data() });
      } catch (e) {
        Alert.alert('Error', 'Failed to load event');
      }
    }
    load();
  }, []);

  const markComplete = async () => {
    try {
      const userId = await getCurrentUserId();
      await firestore().collection('users').doc(userId).collection('events').doc(eventId).update({ status: 'COMPLETED', updatedAt: Date.now() });
      Alert.alert('Success', 'Marked as completed');
      navigation.goBack();
    } catch (e: any) {
      Alert.alert('Error', e.message);
    }
  };

  const deleteEvent = async () => {
    try {
      const userId = await getCurrentUserId();
      await firestore().collection('users').doc(userId).collection('events').doc(eventId).delete();
      navigation.goBack();
    } catch (e: any) {
      Alert.alert('Error', e.message);
    }
  };

  if (!event) return <View style={styles.c}><Text>Loading live data...</Text></View>;

  return (
    <ScrollView style={styles.c}>
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.meta}>{event.category} • {event.priority} • {event.status}</Text>
      <Text style={styles.desc}>{event.description || 'No description'}</Text>
      <Text style={styles.date}>Deadline: {new Date(event.deadline).toLocaleString()}</Text>
      {event.venue && <Text>Venue: {event.venue}</Text>}
      {event.organizer && <Text>Organizer: {event.organizer}</Text>}
      <TouchableOpacity style={styles.btn} onPress={markComplete}><Text style={{ color: 'white', fontWeight: 'bold' }}>Mark Complete</Text></TouchableOpacity>
      <TouchableOpacity style={[styles.btn, { backgroundColor: '#B3261E', marginTop: 12 }]} onPress={deleteEvent}><Text style={{ color: 'white', fontWeight: 'bold' }}>Delete</Text></TouchableOpacity>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  c: { flex: 1, padding: 16, backgroundColor: '#FFFBFE' },
  title: { fontSize: 22, fontWeight: 'bold' },
  meta: { fontSize: 12, color: '#49454F', marginTop: 8 },
  desc: { fontSize: 14, marginTop: 16, lineHeight: 20 },
  date: { fontSize: 14, fontWeight: 'bold', marginTop: 16 },
  btn: { backgroundColor: '#6750A4', padding: 16, borderRadius: 16, alignItems: 'center', marginTop: 24 },
});
