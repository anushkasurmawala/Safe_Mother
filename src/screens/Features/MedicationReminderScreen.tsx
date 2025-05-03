import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Switch,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  time: string;
  isEnabled: boolean;
  type: 'medication' | 'supplement';
  notes?: string;
}

// Mock data - replace with actual data from your backend
const INITIAL_MEDICATIONS: Medication[] = [
  {
    id: '1',
    name: 'Prenatal Vitamins',
    dosage: '1 tablet',
    frequency: 'Daily',
    time: '08:00',
    isEnabled: true,
    type: 'supplement',
    notes: 'Take with food',
  },
  {
    id: '2',
    name: 'Folic Acid',
    dosage: '400mcg',
    frequency: 'Daily',
    time: '09:00',
    isEnabled: true,
    type: 'supplement',
  },
  {
    id: '3',
    name: 'Iron Supplement',
    dosage: '27mg',
    frequency: 'Daily',
    time: '14:00',
    isEnabled: true,
    type: 'supplement',
    notes: 'Take on empty stomach',
  },
];

export const MedicationReminderScreen = () => {
  const [medications, setMedications] = useState<Medication[]>(INITIAL_MEDICATIONS);
  const [modalVisible, setModalVisible] = useState(false);
  const [filter, setFilter] = useState<'all' | 'medication' | 'supplement'>('all');
  const [newMedication, setNewMedication] = useState<Partial<Medication>>({
    type: 'medication',
    isEnabled: true,
  });

  const filteredMedications = medications.filter(med => 
    filter === 'all' ? true : med.type === filter
  );

  const handleAddMedication = () => {
    if (!newMedication.name || !newMedication.dosage || !newMedication.time) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const medication: Medication = {
      id: Date.now().toString(),
      name: newMedication.name,
      dosage: newMedication.dosage,
      frequency: newMedication.frequency || 'Daily',
      time: newMedication.time,
      isEnabled: newMedication.isEnabled || true,
      type: newMedication.type || 'medication',
      notes: newMedication.notes,
    };

    setMedications([...medications, medication]);
    setModalVisible(false);
    setNewMedication({ type: 'medication', isEnabled: true });
  };

  const toggleMedication = (id: string) => {
    setMedications(medications.map(med =>
      med.id === id ? { ...med, isEnabled: !med.isEnabled } : med
    ));
  };

  const renderMedicationItem = ({ item }: { item: Medication }) => (
    <View style={styles.medicationCard}>
      <View style={styles.medicationHeader}>
        <View style={styles.medicationInfo}>
          <Text style={styles.medicationName}>{item.name}</Text>
          <Text style={styles.medicationDosage}>{item.dosage}</Text>
        </View>
        <Switch
          value={item.isEnabled}
          onValueChange={() => toggleMedication(item.id)}
          trackColor={{ false: '#ddd', true: '#bde3ff' }}
          thumbColor={item.isEnabled ? '#007AFF' : '#f4f3f4'}
        />
      </View>

      <View style={styles.medicationDetails}>
        <View style={styles.detailItem}>
          <Ionicons name="time-outline" size={16} color="#666" />
          <Text style={styles.detailText}>{item.time}</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="repeat" size={16} color="#666" />
          <Text style={styles.detailText}>{item.frequency}</Text>
        </View>
        {item.notes && (
          <View style={styles.detailItem}>
            <Ionicons name="information-circle-outline" size={16} color="#666" />
            <Text style={styles.detailText}>{item.notes}</Text>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        {(['all', 'medication', 'supplement'] as const).map((filterType) => (
          <TouchableOpacity
            key={filterType}
            style={[styles.filterButton, filter === filterType && styles.activeFilter]}
            onPress={() => setFilter(filterType)}
          >
            <Text style={[
              styles.filterText,
              filter === filterType && styles.activeFilterText
            ]}>
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredMedications}
        renderItem={renderMedicationItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="add" size={24} color="#fff" />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Reminder</Text>

            <TextInput
              style={styles.input}
              placeholder="Medication Name"
              value={newMedication.name}
              onChangeText={text => setNewMedication({ ...newMedication, name: text })}
            />

            <TextInput
              style={styles.input}
              placeholder="Dosage"
              value={newMedication.dosage}
              onChangeText={text => setNewMedication({ ...newMedication, dosage: text })}
            />

            <TextInput
              style={styles.input}
              placeholder="Time (HH:MM)"
              value={newMedication.time}
              onChangeText={text => setNewMedication({ ...newMedication, time: text })}
            />

            <TextInput
              style={[styles.input, styles.notesInput]}
              placeholder="Notes (optional)"
              value={newMedication.notes}
              onChangeText={text => setNewMedication({ ...newMedication, notes: text })}
              multiline
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleAddMedication}
              >
                <Text style={[styles.buttonText, styles.saveButtonText]}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  filterContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#f8f8f8',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  activeFilter: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  filterText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
  },
  activeFilterText: {
    color: '#fff',
  },
  list: {
    padding: 16,
  },
  medicationCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  medicationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  medicationInfo: {
    flex: 1,
  },
  medicationName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  medicationDosage: {
    fontSize: 14,
    color: '#666',
  },
  medicationDetails: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
    gap: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  notesInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  modalButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f8f8f8',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  saveButton: {
    backgroundColor: '#007AFF',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  saveButtonText: {
    color: '#fff',
  },
});
