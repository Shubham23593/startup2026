import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { getEventsLive } from '../../services/firestoreService';
import { useFocusEffect } from '@react-navigation/native';

export default function CalendarScreen() {
  const [marked, setMarked] = useState<any>({});
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setLoading(true);
      const events = await getEventsLive();
      const m: any = {};
      events.forEach((e: any) => {
        const dateStr = new Date(e.deadline).toISOString().split('T')[0];
        m[dateStr] = { marked: true, dotColor: e.priority === 'URGENT' ? '#B3261E' : '#6750A4', selected: false };
      });
      setMarked(m);
    } catch {
      setMarked({});
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(useCallback(() => { load(); }, []));

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFBFE' }}>
      {loading ? <ActivityIndicator color="#6750A4" style={{ marginTop: 20 }} /> : <Calendar markedDates={marked} theme={{ selectedDayBackgroundColor: '#6750A4', todayTextColor: '#6750A4', dotColor: '#6750A4' }} />}
      <Text style={{ padding: 16, color: '#49454F' }}>Color coded: Red = Urgent, Purple = Normal. Tap date to see events. Live data from Firestore, works offline.</Text>
    </View>
  );
}
