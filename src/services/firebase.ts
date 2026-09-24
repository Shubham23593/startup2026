import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import messaging from '@react-native-firebase/messaging';

// LIVE - No Demo Data
export const FirebaseAuth = auth();
export const Firestore = firestore();
export const FirebaseStorage = storage();
export const FCM = messaging();

// Enable offline persistence for Firestore
Firestore.settings({ persistence: true });

export async function getCurrentUserId(): Promise<string> {
  const user = FirebaseAuth.currentUser;
  if (!user) throw new Error('User not logged in - Please login');
  return user.uid;
}

export async function requestFCMPermission() {
  const authStatus = await FCM.requestPermission();
  return authStatus === 1 || authStatus === 2;
}
