import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { formatDate } from '../../utils/dateUtils';
import { useUser } from '../../context/UserContext';
import { saveAppointment } from '../../services/dashboardService';

interface AppointmentDetails {
  doctorId: string;
  date: Date;
  time: string;
  type: string;
  notes: string;
}

interface Appointment {
  userId: string;
  type: string;
  date: string;
  time: string;
  doctor: string;
}

const APPOINTMENT_TYPES = [
  'Regular Checkup',
  'Ultrasound',
  'Blood Test',
  'Vaccination',
  'Consultation',
];

const TIME_SLOTS = [
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
];

export const AppointmentSchedulerScreen = ({ navigation, route }: any) => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState<AppointmentDetails>({
    doctorId: route.params?.doctorId || '',
    date: new Date(),
    time: '',
    type: '',
    notes: '',
  });

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setAppointmentDetails(prev => ({ ...prev, date: selectedDate }));
    }
  };

  const handleSubmit = async () => {
    if (!user?.uid) {
      Alert.alert('Error', 'User not authenticated');
      return;
    }

    if (!appointmentDetails.time || !appointmentDetails.type) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      await saveAppointment({
        userId: user.uid,
        type: appointmentDetails.type,
        date: formatDate(appointmentDetails.date),
        time: appointmentDetails.time,
        doctor: 'Dr. Smith',
      });
      
      Alert.alert(
        'Success',
        'Appointment scheduled successfully',
        [{ 
          text: 'OK', 
          onPress: () => {
            navigation.navigate('Dashboard', { appointmentAdded: true });
          }
        }]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to schedule appointment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Select Date</Text>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Ionicons name="calendar" size={24} color="#007AFF" />
          <Text style={styles.dateText}>
            {formatDate(appointmentDetails.date)}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={appointmentDetails.date}
            mode="date"
            display="default"
            onChange={handleDateChange}
            minimumDate={new Date()}
          />
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Select Time</Text>
        <View style={styles.timeGrid}>
          {TIME_SLOTS.map((time) => (
            <TouchableOpacity
              key={time}
              style={[
                styles.timeSlot,
                appointmentDetails.time === time && styles.selectedTimeSlot,
              ]}
              onPress={() => setAppointmentDetails(prev => ({ ...prev, time }))}
            >
              <Text style={[
                styles.timeSlotText,
                appointmentDetails.time === time && styles.selectedTimeSlotText
              ]}>
                {time}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Appointment Type</Text>
        <View style={styles.typeGrid}>
          {APPOINTMENT_TYPES.map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.typeButton,
                appointmentDetails.type === type && styles.selectedTypeButton,
              ]}
              onPress={() => setAppointmentDetails(prev => ({ ...prev, type }))}
            >
              <Text style={[
                styles.typeButtonText,
                appointmentDetails.type === type && styles.selectedTypeButtonText
              ]}>
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Additional Notes</Text>
        <TextInput
          style={styles.notesInput}
          multiline
          numberOfLines={4}
          placeholder="Add any specific concerns or notes for the doctor..."
          value={appointmentDetails.notes}
          onChangeText={(text) => setAppointmentDetails(prev => ({ ...prev, notes: text }))}
        />
      </View>

      <TouchableOpacity
        style={[styles.submitButton, loading && styles.disabledButton]}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.submitButtonText}>Schedule Appointment</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  section: {
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  dateText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  timeSlot: {
    padding: 12,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    minWidth: '30%',
    alignItems: 'center',
  },
  selectedTimeSlot: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  timeSlotText: {
    color: '#333',
  },
  selectedTimeSlotText: {
    color: '#fff',
  },
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  typeButton: {
    padding: 12,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    minWidth: '45%',
    alignItems: 'center',
  },
  selectedTypeButton: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  typeButtonText: {
    color: '#333',
  },
  selectedTypeButtonText: {
    color: '#fff',
  },
  notesInput: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    margin: 16,
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
