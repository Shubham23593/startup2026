import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { getEventsLive } from '../../services/firestoreService';
import { formatDistanceToNow } from 'date-fns';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const data = await getEventsLive();
      setEvents(data);
    } catch (e) {
      // No demo data - show empty
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(useCallback(() => { loadEvents(); }, []));
  const onRefresh = async () => { setRefreshing(true); await loadEvents(); setRefreshing(false); };

  const urgentEvents = events.filter(e => e.priority === 'URGENT' || e.priority === 'HIGH');
  const todayEvents = events.filter(e => {
    const d = new Date(e.deadline);
    const today = new Date();
    return d.toDateString() === today.toDateString();
  });

  const nextDeadline = events.length > 0 ? events[0] : null;

  return (
    <ScrollView style={styles.container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} showsVerticalScrollIndicator={false}>
      <LinearGradient colors={['#6750A4', '#7D5260']} style={styles.header}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <Text style={styles.greeting}>Hello 👋</Text>
            <Text style={styles.sub}>{todayEvents.length} deadlines today • {urgentEvents.length} urgent</Text>
          </View>
          <TouchableOpacity style={styles.profile}><Text style={{ color: 'white', fontWeight: 'bold' }}>U</Text></TouchableOpacity>
        </View>
        {nextDeadline ? (
          <View style={styles.countdownCard}>
            <Text style={styles.countdownTitle}>📅 Next Deadline</Text>
            <Text style={styles.countdownEvent}>{nextDeadline.title}</Text>
            <Text style={styles.countdownTime}>{formatDistanceToNow(new Date(nextDeadline.deadline), { addSuffix: true })}</Text>
            <View style={{ flexDirection: 'row', marginTop: 8 }}>
              {(() => {
                const diff = nextDeadline.deadline - Date.now();
                const days = Math.floor(diff / (24*60*60*1000));
                const hours = Math.floor((diff % (24*60*60*1000))/(60*60*1000));
                const mins = Math.floor((diff % (60*60*1000))/(60*1000));
                return (
                  <>
                    <View style={styles.timeBox}><Text style={styles.timeNum}>{days}</Text><Text style={styles.timeLabel}>Days</Text></View>
                    <View style={styles.timeBox}><Text style={styles.timeNum}>{hours}</Text><Text style={styles.timeLabel}>Hours</Text></View>
                    <View style={styles.timeBox}><Text style={styles.timeNum}>{mins}</Text><Text style={styles.timeLabel}>Mins</Text></View>
                  </>
                );
              })()}
            </View>
          </View>
        ) : (
          <View style={styles.countdownCard}><Text style={{ color: 'white' }}>No deadlines yet. Tap + to create your first one.</Text></View>
        )}
      </LinearGradient>

      <View style={styles.statsRow}>
        <View style={[styles.statCard, { backgroundColor: '#EADDFF' }]}><Text style={styles.statNum}>{todayEvents.length}</Text><Text style={styles.statLabel}>Today</Text></View>
        <View style={[styles.statCard, { backgroundColor: '#FFDAD6' }]}><Text style={styles.statNum}>{urgentEvents.length}</Text><Text style={styles.statLabel}>Urgent</Text></View>
        <View style={[styles.statCard, { backgroundColor: '#C2E8FF' }]}><Text style={styles.statNum}>{events.filter(e=>e.status==='COMPLETED').length}</Text><Text style={styles.statLabel}>Done</Text></View>
      </View>

      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.quickRow}>
        <TouchableOpacity style={styles.quickCard} onPress={() => navigation.navigate('HackathonTracker' as never)}><Icon name="trophy" size={24} color="#6750A4"/><Text style={styles.quickText}>Hackathon</Text></TouchableOpacity>
        <TouchableOpacity style={styles.quickCard} onPress={() => navigation.navigate('AssignmentTracker' as never)}><Icon name="book" size={24} color="#6750A4"/><Text style={styles.quickText}>Assignment</Text></TouchableOpacity>
        <TouchableOpacity style={styles.quickCard} onPress={() => navigation.navigate('InternshipTracker' as never)}><Icon name="briefcase" size={24} color="#6750A4"/><Text style={styles.quickText}>Internship</Text></TouchableOpacity>
        <TouchableOpacity style={styles.quickCard} onPress={() => navigation.navigate('AI' as never)}><Icon name="robot" size={24} color="#6750A4"/><Text style={styles.quickText}>AI Scan</Text></TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Your Deadlines</Text>
      {loading ? <ActivityIndicator style={{ marginTop: 20 }} color="#6750A4" /> : events.length === 0 ? (
        <View style={styles.emptyCard}>
          <Icon name="calendar-blank" size={48} color="#CAC4D0" />
          <Text style={styles.emptyTitle}>No deadlines yet</Text>
          <Text style={styles.emptyDesc}>Create your first deadline to never miss it again. It will work offline too.</Text>
          <TouchableOpacity style={styles.emptyBtn} onPress={() => navigation.navigate('CreateEvent' as never)}><Text style={{ color: 'white', fontWeight: 'bold' }}>+ Create Deadline</Text></TouchableOpacity>
        </View>
      ) : events.map(event => (
        <TouchableOpacity key={event.id} style={styles.eventCard} onPress={() => navigation.navigate('EventDetail' as never, { eventId: event.id } as never)}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}><View style={[styles.dot, { backgroundColor: event.priority==='URGENT'?'#B3261E':'#6750A4' }]} /><Text style={styles.eventTitle}>{event.title}</Text></View>
            <Text style={[styles.urgent, event.priority==='URGENT' && { backgroundColor: '#FFDAD6', color: '#B3261E' }]}>{event.priority}</Text>
          </View>
          <Text style={styles.eventDesc}>{event.category} • {formatDistanceToNow(new Date(event.deadline), { addSuffix: true })}</Text>
        </TouchableOpacity>
      ))}
      <View style={{ height: 120 }} />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFBFE' },
  header: { padding: 20, paddingTop: 50, borderBottomLeftRadius: 32, borderBottomRightRadius: 32, minHeight: 280 },
  greeting: { fontSize: 22, fontWeight: 'bold', color: 'white' },
  sub: { fontSize: 14, color: 'rgba(255,255,255,0.8)', marginTop: 4 },
  profile: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.3)', justifyContent: 'center', alignItems: 'center' },
  countdownCard: { backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 20, padding: 16, marginTop: 20 },
  countdownTitle: { color: 'white', fontSize: 12 },
  countdownEvent: { color: 'white', fontSize: 18, fontWeight: 'bold', marginTop: 4 },
  countdownTime: { color: 'rgba(255,255,255,0.8)', fontSize: 12, marginTop: 4 },
  timeBox: { backgroundColor: 'white', borderRadius: 12, padding: 10, marginRight: 8, minWidth: 60, alignItems: 'center' },
  timeNum: { fontSize: 20, fontWeight: 'bold', color: '#6750A4' },
  timeLabel: { fontSize: 10, color: '#49454F' },
  statsRow: { flexDirection: 'row', padding: 16, marginTop: -40, justifyContent: 'space-between' },
  statCard: { width: '30%', borderRadius: 20, padding: 16, alignItems: 'center', elevation: 4 },
  statNum: { fontSize: 24, fontWeight: 'bold' },
  statLabel: { fontSize: 12, color: '#49454F', marginTop: 4 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginHorizontal: 16, marginTop: 16 },
  quickRow: { flexDirection: 'row', flexWrap: 'wrap', padding: 16, justifyContent: 'space-between' },
  quickCard: { width: '22%', backgroundColor: 'white', borderRadius: 16, padding: 12, alignItems: 'center', elevation: 2, marginBottom: 12 },
  quickText: { fontSize: 11, marginTop: 6, fontWeight: '600' },
  eventCard: { backgroundColor: 'white', marginHorizontal: 16, marginTop: 12, borderRadius: 16, padding: 16, elevation: 2 },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#B3261E', marginRight: 8 },
  eventTitle: { fontWeight: 'bold', fontSize: 14, flex: 1 },
  urgent: { backgroundColor: '#EADDFF', color: '#4F378B', fontSize: 10, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8, fontWeight: 'bold' },
  eventDesc: { fontSize: 12, color: '#49454F', marginTop: 6 },
  emptyCard: { backgroundColor: 'white', margin: 16, borderRadius: 24, padding: 32, alignItems: 'center', elevation: 2 },
  emptyTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 16 },
  emptyDesc: { fontSize: 14, color: '#49454F', textAlign: 'center', marginTop: 8, lineHeight: 20 },
  emptyBtn: { backgroundColor: '#6750A4', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 16, marginTop: 16 },
});
