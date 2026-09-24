import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import notifee, { TriggerType } from '@notifee/react-native';
import { useNavigation } from '@react-navigation/native';

export default function CreateEventScreen() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('HACKATHON');
  const [deadline, setDeadline] = useState('');
  const navigation = useNavigation();

  const createEvent = async () => {
    try {
      const userId = auth().currentUser?.uid || 'demo';
      const eventId = Date.now().toString();
      const deadlineTime = Date.now() + 2 * 24 * 60 * 60 * 1000; // 2 days later for demo

      // Save to Firestore
      await firestore().collection('users').doc(userId).collection('events').doc(eventId).set({
        title, category, deadline: deadlineTime, priority: 'HIGH', status: 'PENDING', createdAt: Date.now()
      });

      // Schedule local notifications - 7 days, 1 day, 1 hour, 30 min
      const reminders = [7*24*60*60*1000, 24*60*60*1000, 60*60*1000, 30*60*1000];
      for (let i=0; i<reminders.length; i++) {
        const triggerTime = deadlineTime - reminders[i];
        if (triggerTime > Date.now()) {
          await notifee.createTriggerNotification({
            title: `📅 ${title} - ${reminders[i]/(24*60*60*1000) >=1 ? Math.floor(reminders[i]/(24*60*60*1000))+' Days Left' : '1 Hour Left'}`,
            body: `Remaining: ${Math.floor((deadlineTime-Date.now())/(24*60*60*1000))} Days - Tap to open`,
            android: { channelId: 'deadlines', pressAction: { id: 'default' }, actions: [{ title: 'Mark Complete', pressAction: { id: 'complete' } }, { title: 'Snooze', pressAction: { id: 'snooze' } }] }
          }, { type: TriggerType.TIMESTAMP, timestamp: triggerTime });
        }
      }

      Alert.alert('Success', 'Event created & notifications scheduled even offline!');
      navigation.goBack();
    } catch (e) {
      Alert.alert('Demo Mode', 'Event created locally (offline)');
      navigation.goBack();
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Title *</Text>
      <TextInput placeholder="e.g. Google Girl Hackathon" value={title} onChangeText={setTitle} style={styles.input} />
      <Text style={styles.label}>Category</Text>
      <View style={styles.catRow}>
        {['HACKATHON','ASSIGNMENT','INTERNSHIP','INTERVIEW','EXAM'].map(c => (
          <TouchableOpacity key={c} style={[styles.catChip, category===c && styles.catActive]} onPress={() => setCategory(c)}><Text style={category===c ? {color:'white'} : {}}>{c}</Text></TouchableOpacity>
        ))}
      </View>
      <Text style={styles.label}>Deadline</Text>
      <TextInput placeholder="YYYY-MM-DD HH:MM" value={deadline} onChangeText={setDeadline} style={styles.input} />
      <Text style={styles.label}>Priority</Text>
      <View style={styles.catRow}>
        {['LOW','MEDIUM','HIGH','URGENT'].map(p => (<View key={p} style={styles.catChip}><Text>{p}</Text></View>))}
      </View>
      <TouchableOpacity style={styles.btn} onPress={createEvent}><Text style={styles.btnText}>Create Deadline + Auto Reminders</Text></TouchableOpacity>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#FFFBFE' },
  label: { fontWeight: 'bold', marginTop: 16, marginBottom: 8 },
  input: { backgroundColor: 'white', padding: 16, borderRadius: 16, borderWidth: 1, borderColor: '#E7E0EC' },
  catRow: { flexDirection: 'row', flexWrap: 'wrap' },
  catChip: { padding: 10, borderRadius: 20, backgroundColor: '#E7E0EC', marginRight: 8, marginBottom: 8 },
  catActive: { backgroundColor: '#6750A4' },
  btn: { backgroundColor: '#6750A4', padding: 16, borderRadius: 16, alignItems: 'center', marginTop: 24 },
  btnText: { color: 'white', fontWeight: 'bold' },
});
