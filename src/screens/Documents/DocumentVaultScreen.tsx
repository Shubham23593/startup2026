import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert, ActivityIndicator } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';
import { getDocumentsLive, saveDocumentMeta } from '../../services/firestoreService';
import { getCurrentUserId } from '../../services/firebase';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EmptyState from '../../components/common/EmptyState';
import { useFocusEffect } from '@react-navigation/native';

export default function DocumentVaultScreen() {
  const [docs, setDocs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const load = async () => {
    try { setLoading(true); const data = await getDocumentsLive(); setDocs(data); } catch { setDocs([]); } finally { setLoading(false); }
  };
  useFocusEffect(useCallback(() => { load(); }, []));

  const pickAndUpload = async () => {
    try {
      const res = await DocumentPicker.pick({ type: [DocumentPicker.types.allFiles] });
      const file = res[0];
      setUploading(true);
      const userId = await getCurrentUserId();
      const ref = storage().ref(`users/${userId}/documents/${Date.now()}_${file.name}`);
      await ref.putFile(file.uri);
      const url = await ref.getDownloadURL();
      await saveDocumentMeta({ name: file.name, type: file.type || 'unknown', size: file.size || 0, cloudUrl: url, category: 'GENERAL' });
      Alert.alert('Success', 'Document uploaded live!');
      load();
    } catch (e: any) {
      if (!DocumentPicker.isCancel(e)) Alert.alert('Error', e.message);
    } finally { setUploading(false); }
  };

  return (
    <View style={styles.c}>
      <TouchableOpacity style={styles.upload} onPress={pickAndUpload} disabled={uploading}>
        <Icon name="cloud-upload" size={20} color="white" /><Text style={{ color: 'white', fontWeight: 'bold', marginLeft: 8 }}>{uploading ? 'Uploading...' : 'Upload PDF/DOCX/PPT/Image'}</Text>
      </TouchableOpacity>
      {loading ? <ActivityIndicator color="#6750A4" style={{ marginTop: 20 }} /> : docs.length === 0 ? <EmptyState icon="folder-outline" title="Vault is empty" desc="Upload your Resume, Certificates, Lab Manuals. Secure cloud storage with offline download." actionText="Upload First Document" onAction={pickAndUpload} /> : (
        <FlatList data={docs} keyExtractor={i => i.id} numColumns={2} renderItem={({ item }) => (
          <View style={styles.folder}><Icon name="file-document" size={32} color="#6750A4" /><Text numberOfLines={1} style={{ fontSize: 12, marginTop: 8 }}>{item.name}</Text><Text style={{ fontSize: 10, color: '#666' }}>{Math.round(item.size/1024)} KB</Text></View>
        )} />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  c: { flex: 1, padding: 16, backgroundColor: '#FFFBFE' },
  upload: { backgroundColor: '#6750A4', padding: 16, borderRadius: 16, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' },
  folder: { width: '47%', height: 120, backgroundColor: 'white', borderRadius: 16, justifyContent: 'center', alignItems: 'center', margin: '1.5%', elevation: 2, padding: 8 },
});
