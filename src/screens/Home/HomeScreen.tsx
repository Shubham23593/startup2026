import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient colors={['#6750A4', '#7D5260']} style={styles.header}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <Text style={styles.greeting}>Good Morning, Shubham 👋</Text>
            <Text style={styles.sub}>3 urgent deadlines today</Text>
          </View>
          <TouchableOpacity style={styles.profile}><Text style={{ color: 'white', fontWeight: 'bold' }}>S</Text></TouchableOpacity>
        </View>
        {/* Countdown */}
        <View style={styles.countdownCard}>
          <Text style={styles.countdownTitle}>📅 Next Deadline</Text>
          <Text style={styles.countdownEvent}>Google Girl Hackathon</Text>
          <View style={{ flexDirection: 'row', marginTop: 8 }}>
            <View style={styles.timeBox}><Text style={styles.timeNum}>02</Text><Text style={styles.timeLabel}>Days</Text></View>
            <View style={styles.timeBox}><Text style={styles.timeNum}>06</Text><Text style={styles.timeLabel}>Hours</Text></View>
            <View style={styles.timeBox}><Text style={styles.timeNum}>12</Text><Text style={styles.timeLabel}>Mins</Text></View>
          </View>
        </View>
      </LinearGradient>

      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={[styles.statCard, { backgroundColor: '#EADDFF' }]}><Text style={styles.statNum}>5</Text><Text style={styles.statLabel}>Today</Text></View>
        <View style={[styles.statCard, { backgroundColor: '#FFDAD6' }]}><Text style={styles.statNum}>3</Text><Text style={styles.statLabel}>Urgent</Text></View>
        <View style={[styles.statCard, { backgroundColor: '#C2E8FF' }]}><Text style={styles.statNum}>12</Text><Text style={styles.statLabel}>Done</Text></View>
      </View>

      {/* Quick Actions */}
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.quickRow}>
        <TouchableOpacity style={styles.quickCard} onPress={() => navigation.navigate('HackathonTracker' as never)}><Icon name="trophy" size={24} color="#6750A4"/><Text style={styles.quickText}>Hackathon</Text></TouchableOpacity>
        <TouchableOpacity style={styles.quickCard} onPress={() => navigation.navigate('AssignmentTracker' as never)}><Icon name="book" size={24} color="#6750A4"/><Text style={styles.quickText}>Assignment</Text></TouchableOpacity>
        <TouchableOpacity style={styles.quickCard} onPress={() => navigation.navigate('InternshipTracker' as never)}><Icon name="briefcase" size={24} color="#6750A4"/><Text style={styles.quickText}>Internship</Text></TouchableOpacity>
        <TouchableOpacity style={styles.quickCard} onPress={() => navigation.navigate('AI' as never)}><Icon name="robot" size={24} color="#6750A4"/><Text style={styles.quickText}>AI Scan</Text></TouchableOpacity>
      </View>

      {/* Today's Tasks */}
      <Text style={styles.sectionTitle}>Today's Deadlines</Text>
      <View style={styles.eventCard}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}><View style={styles.dot} /><Text style={styles.eventTitle}>DBMS Assignment 4</Text></View>
          <Text style={styles.urgent}>URGENT</Text>
        </View>
        <Text style={styles.eventDesc}>Prof. Sharma - Due 11:59 PM</Text>
        <View style={styles.progressBar}><View style={[styles.progressFill, { width: '70%' }]} /></View>
      </View>

      <View style={styles.eventCard}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}><View style={[styles.dot, { backgroundColor: '#7D5260' }]} /><Text style={styles.eventTitle}>SIH Registration</Text></View>
          <Text style={[styles.urgent, { backgroundColor: '#EADDFF', color: '#4F378B' }]}>2 DAYS</Text>
        </View>
        <Text style={styles.eventDesc}>Team: 6 members - PPT pending</Text>
      </View>

      <View style={{ height: 100 }} />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFBFE' },
  header: { padding: 20, paddingTop: 50, borderBottomLeftRadius: 32, borderBottomRightRadius: 32, height: 300 },
  greeting: { fontSize: 22, fontWeight: 'bold', color: 'white' },
  sub: { fontSize: 14, color: 'rgba(255,255,255,0.8)', marginTop: 4 },
  profile: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.3)', justifyContent: 'center', alignItems: 'center' },
  countdownCard: { backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 20, padding: 16, marginTop: 20 },
  countdownTitle: { color: 'white', fontSize: 12 },
  countdownEvent: { color: 'white', fontSize: 18, fontWeight: 'bold', marginTop: 4 },
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
  eventTitle: { fontWeight: 'bold', fontSize: 14 },
  urgent: { backgroundColor: '#FFDAD6', color: '#B3261E', fontSize: 10, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8, fontWeight: 'bold' },
  eventDesc: { fontSize: 12, color: '#49454F', marginTop: 6 },
  progressBar: { height: 6, backgroundColor: '#E7E0EC', borderRadius: 3, marginTop: 12 },
  progressFill: { height: 6, backgroundColor: '#6750A4', borderRadius: 3 },
});
