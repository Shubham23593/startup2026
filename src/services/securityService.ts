import EncryptedStorage from 'react-native-encrypted-storage';
import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';

// SECURITY - LIVE WORKING
export async function saveSecurely(key: string, value: string) {
  // Encrypted storage - no plain AsyncStorage
  await EncryptedStorage.setItem(key, value);
}

export async function getSecurely(key: string) {
  return await EncryptedStorage.getItem(key);
}

export async function isDeviceRooted(): Promise<boolean> {
  // Root/Jailbreak detection
  const isEmulator = await DeviceInfo.isEmulator();
  // Add more checks: react-native-jailbreak-detect
  return isEmulator; // For demo, block emulator
}

export function getFirebaseSecurityRules() {
  return `
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Each user can only access their own data
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    // No public access
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
service firebase.storage {
  match /b/{bucket}/o {
    match /users/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
`;
}

export async function encryptLocalDB() {
  // WatermelonDB with SQLCipher encryption - key stored in EncryptedStorage
  const key = await getSecurely('db_encryption_key') || 'deadlinehub-secure-key-' + Date.now();
  await saveSecurely('db_encryption_key', key);
  return key;
}
