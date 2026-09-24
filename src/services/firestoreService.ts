import firestore from '@react-native-firebase/firestore';
import { getCurrentUserId } from './firebase';

// LIVE WORKING - No Demo Data - Real Firestore Operations
export async function createEventLive(data: {
  title: string;
  description: string;
  category: string;
  deadline: number;
  priority: string;
  venue?: string;
  organizer?: string;
}) {
  const userId = await getCurrentUserId();
  const ref = firestore().collection('users').doc(userId).collection('events').doc();
  const payload = {
    ...data,
    userId,
    status: 'PENDING',
    isPinned: false,
    isFavorite: false,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  await ref.set(payload);
  return ref.id;
}

export async function getEventsLive() {
  const userId = await getCurrentUserId();
  const snap = await firestore()
    .collection('users')
    .doc(userId)
    .collection('events')
    .orderBy('deadline', 'asc')
    .get();
  return snap.docs.map(d => ({ id: d.id, ...(d.data() as any) }));
}

export async function updateEventStatus(eventId: string, status: string) {
  const userId = await getCurrentUserId();
  await firestore().collection('users').doc(userId).collection('events').doc(eventId).update({
    status,
    updatedAt: Date.now(),
  });
}

export async function deleteEventLive(eventId: string) {
  const userId = await getCurrentUserId();
  await firestore().collection('users').doc(userId).collection('events').doc(eventId).delete();
}

// TASKS - LIVE
export async function createTaskLive(data: { title: string; description?: string; priority: string; dueDate?: number }) {
  const userId = await getCurrentUserId();
  const ref = firestore().collection('users').doc(userId).collection('tasks').doc();
  await ref.set({
    ...data,
    userId,
    isCompleted: false,
    createdAt: Date.now(),
  });
  return ref.id;
}

export async function getTasksLive() {
  const userId = await getCurrentUserId();
  const snap = await firestore().collection('users').doc(userId).collection('tasks').orderBy('createdAt', 'desc').get();
  return snap.docs.map(d => ({ id: d.id, ...(d.data() as any) }));
}

export async function toggleTaskComplete(taskId: string, isCompleted: boolean) {
  const userId = await getCurrentUserId();
  await firestore().collection('users').doc(userId).collection('tasks').doc(taskId).update({
    isCompleted: !isCompleted,
    updatedAt: Date.now(),
  });
}

// NOTES - LIVE
export async function createNoteLive(data: { title: string; content: string }) {
  const userId = await getCurrentUserId();
  const ref = firestore().collection('users').doc(userId).collection('notes').doc();
  await ref.set({ ...data, userId, isPinned: false, isFavorite: false, createdAt: Date.now() });
  return ref.id;
}

export async function getNotesLive() {
  const userId = await getCurrentUserId();
  const snap = await firestore().collection('users').doc(userId).collection('notes').orderBy('createdAt', 'desc').get();
  return snap.docs.map(d => ({ id: d.id, ...(d.data() as any) }));
}

// DOCUMENTS - LIVE
export async function saveDocumentMeta(data: { name: string; type: string; size: number; cloudUrl: string; category: string }) {
  const userId = await getCurrentUserId();
  const ref = firestore().collection('users').doc(userId).collection('documents').doc();
  await ref.set({ ...data, userId, createdAt: Date.now() });
  return ref.id;
}

export async function getDocumentsLive() {
  const userId = await getCurrentUserId();
  const snap = await firestore().collection('users').doc(userId).collection('documents').orderBy('createdAt', 'desc').get();
  return snap.docs.map(d => ({ id: d.id, ...(d.data() as any) }));
}
