import React from 'react';
import { View, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
export default function CalendarScreen() {
  return <View style={{flex:1}}><Calendar markedDates={{'2026-09-24': {selected: true, marked: true, selectedColor: '#6750A4'}}} /><Text style={{padding:16}}>Color coded events - Tap to edit, delete, countdown</Text></View>;
}
