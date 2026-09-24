import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Screens
import SplashScreen from '../screens/SplashScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import HomeScreen from '../screens/Home/HomeScreen';
import CalendarScreen from '../screens/Calendar/CalendarScreen';
import TodoScreen from '../screens/Todo/TodoScreen';
import NotesScreen from '../screens/Notes/NotesScreen';
import DocumentVaultScreen from '../screens/Documents/DocumentVaultScreen';
import StatisticsScreen from '../screens/Statistics/StatisticsScreen';
import SettingsScreen from '../screens/Settings/SettingsScreen';
import CreateEventScreen from '../screens/Events/CreateEventScreen';
import EventDetailScreen from '../screens/Events/EventDetailScreen';
import HackathonTrackerScreen from '../screens/Trackers/HackathonTrackerScreen';
import AssignmentTrackerScreen from '../screens/Trackers/AssignmentTrackerScreen';
import InternshipTrackerScreen from '../screens/Trackers/InternshipTrackerScreen';
import AIScreen from '../screens/AI/AIScreen';

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Login: undefined;
  MainTabs: undefined;
  CreateEvent: undefined;
  EventDetail: { eventId: string };
  HackathonTracker: undefined;
  AssignmentTracker: undefined;
  InternshipTracker: undefined;
  AI: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Calendar: undefined;
  Todo: undefined;
  Notes: undefined;
  Documents: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          borderRadius: 24,
          marginHorizontal: 16,
          marginBottom: 16,
          height: 70,
          position: 'absolute',
          backgroundColor: 'white',
          elevation: 10,
          shadowOpacity: 0.1,
        },
        tabBarActiveTintColor: '#6750A4',
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: ({ color, size }) => <Icon name="view-dashboard" color={color} size={size} /> }} />
      <Tab.Screen name="Calendar" component={CalendarScreen} options={{ tabBarIcon: ({ color, size }) => <Icon name="calendar-month" color={color} size={size} /> }} />
      <Tab.Screen name="Todo" component={TodoScreen} options={{ tabBarIcon: ({ color, size }) => <Icon name="check-circle" color={color} size={size} /> }} />
      <Tab.Screen name="Notes" component={NotesScreen} options={{ tabBarIcon: ({ color, size }) => <Icon name="notebook" color={color} size={size} /> }} />
      <Tab.Screen name="Documents" component={DocumentVaultScreen} options={{ tabBarIcon: ({ color, size }) => <Icon name="folder" color={color} size={size} /> }} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="CreateEvent" component={CreateEventScreen} options={{ headerShown: true, title: 'New Deadline', presentation: 'modal' }} />
      <Stack.Screen name="EventDetail" component={EventDetailScreen} options={{ headerShown: true, title: 'Details' }} />
      <Stack.Screen name="HackathonTracker" component={HackathonTrackerScreen} options={{ headerShown: true, title: 'Hackathon Tracker' }} />
      <Stack.Screen name="AssignmentTracker" component={AssignmentTrackerScreen} options={{ headerShown: true, title: 'Assignments' }} />
      <Stack.Screen name="InternshipTracker" component={InternshipTrackerScreen} options={{ headerShown: true, title: 'Internships' }} />
      <Stack.Screen name="AI" component={AIScreen} options={{ headerShown: true, title: 'AI Assistant' }} />
    </Stack.Navigator>
  );
}
