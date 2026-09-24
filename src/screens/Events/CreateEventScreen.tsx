import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Alert, Platform } from 'react-native';
import { createEventLive } from '../../services/firestoreService';
import { scheduleDeadlineReminders } from '../../services/notificationService';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function CreateEventScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('HACKATHON');
  const [priority, setPriority] = useState('HIGH');
  const [deadline, setDeadline] = useState(new Date(Date.now() + 2*24*60*60*1000));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const navigation = useNavigation();

  const createEvent = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter title');
      return;
    }
    try {
      const eventId = await createEventLive({
        title: title.trim(),
        description: description.trim(),
        category,
        deadline: deadline.getTime(),
        priority,
      });

      // Schedule real local notifications - works offline, app closed, phone locked
      await scheduleDeadlineReminders(eventId, title, deadline.getTime());

      Alert.alert('Success', 'Deadline created! Notifications scheduled - will work offline, even if app is closed.');
      navigation.goBack();
    } catch (e: any) {
      Alert.alert('Error', e.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Title *</Text>
      <TextInput placeholder="e.g. SIH 2026 Registration" value={title} onChangeText={setTitle} style={styles.input} placeholderTextColor="#999" />

      <Text style={styles.label}>Description</Text>
      <TextInput placeholder="Add details, links, venue..." value={description} onChangeText={setDescription} style={[styles.input, { height: 80, textAlignVertical: 'top' }]} multiline placeholderTextColor="#999" />

      <Text style={styles.label}>Category</Text>
      <View style={styles.catRow}>
        {['HACKATHON','ASSIGNMENT','INTERNSHIP','INTERVIEW','CODING_CONTEST','WORKSHOP','EXAM','PROJECT'].map(c => (
          <TouchableOpacity key={c} style={[styles.catChip, category===c && styles.catActive]} onPress={() => setCategory(c)}>
            <Text style={[styles.catText, category===c && { color: 'white' }]}>{c}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Deadline *</Text>
      <TouchableOpacity style={styles.input} onPress={() => setShowDatePicker(true)}>
        <Text>{deadline.toLocaleString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={deadline}
          mode="datetime"
          display="default"
          onChange={(e, d) => { setShowDatePicker(Platform.OS === 'ios'); if (d) setDeadline(d); }}
        />
      )}

      <Text style={styles.label}>Priority</Text>
      <View style={styles.catRow}>
        {['LOW','MEDIUM','HIGH','URGENT'].map(p => (
          <TouchableOpacity key={p} style={[styles.catChip, priority===p && styles.catActive]} onPress={() => setPriority(p)}>
            <Text style={[styles.catText, priority===p && { color: 'white' }]}>{p}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>🔔 Auto Reminders will be scheduled: 7 days, 1 day, 1 hour, 30 min before. Works offline, even if app is closed or phone is locked. Restores after phone restart.</Text>
      </View>

      <TouchableOpacity style={styles.btn} onPress={createEvent}>
        <Text style={styles.btnText}>Create Live Deadline + Notifications</Text>
      </TouchableOpacity>
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#FFFBFE' },
  label: { fontWeight: 'bold', marginTop: 16, marginBottom: 8, color: '#1C1B1F' },
  input: { backgroundColor: 'white', padding: 16, borderRadius: 16, borderWidth: 1, borderColor: '#E7E0EC', color: '#000' },
  catRow: { flexDirection: 'row', flexWrap: 'wrap' },
  catChip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, backgroundColor: '#E7E0EC', marginRight: 8, marginBottom: 8 },
  catActive: { backgroundColor: '#6750A4' },
  catText: { fontSize: 12, fontWeight: '600' },
  infoBox: { backgroundColor: '#EADDFF', padding: 12, borderRadius: 12, marginTop: 16 },
  infoText: { fontSize: 12, color: '#4F378B', lineHeight: 18 },
  btn: { backgroundColor: '#6750A4', padding: 16, borderRadius: 16, alignItems: 'center', marginTop: 24, elevation: 4 },
  btnText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});
