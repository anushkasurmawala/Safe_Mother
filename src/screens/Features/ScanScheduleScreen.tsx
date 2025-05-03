import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { ScanScheduleItem } from '../../components/Scan/ScanScheduleItem';

interface IScanScheduleItem {
  id: string;
  weekNumber: number;
  scanType: string;
  description: string;
  isRequired: boolean;
}

// This would typically come from your backend
const SCAN_SCHEDULE: IScanScheduleItem[] = [
  {
    id: '1',
    weekNumber: 8,
    scanType: 'Dating Scan',
    description: "Confirm pregnancy dates and check baby's development",
    isRequired: true,
  },
  {
    id: '2',
    weekNumber: 12,
    scanType: 'Nuchal Translucency Scan',
    description: 'Screen for chromosomal abnormalities',
    isRequired: true,
  },
  {
    id: '3',
    weekNumber: 20,
    scanType: 'Anomaly Scan',
    description: "Detailed check of baby's development and organs",
    isRequired: true,
  },
  {
    id: '4',
    weekNumber: 28,
    scanType: 'Growth Scan',
    description: "Check baby's growth and position",
    isRequired: false,
  },
  {
    id: '5',
    weekNumber: 32,
    scanType: 'Position Scan',
    description: "Check baby's position and growth",
    isRequired: false,
  },
  {
    id: '6',
    weekNumber: 36,
    scanType: 'Presentation Scan',
    description: "Confirm baby's final position before birth",
    isRequired: true,
  },
];

export const ScanScheduleScreen = ({ navigation }: any) => {
  const [scheduledScans, setScheduledScans] = useState<{[key: string]: Date}>({});
  const [completedScans, setCompletedScans] = useState<string[]>([]);

  const handleScanPress = (scanId: string) => {
    Alert.alert(
      'Scan Options',
      'What would you like to do?',
      [
        {
          text: 'Schedule Scan',
          onPress: () => navigation.navigate('AppointmentScheduler', {
            appointmentType: 'scan',
            scanId: scanId,
          }),
        },
        {
          text: 'Mark as Completed',
          onPress: () => setCompletedScans(prev => [...prev, scanId]),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Pregnancy Scan Schedule</Text>
        <Text style={styles.subtitle}>
          Keep track of your important ultrasound appointments
        </Text>
      </View>

      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.dot, { backgroundColor: '#34C759' }]} />
          <Text style={styles.legendText}>Completed</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.dot, { backgroundColor: '#007AFF' }]} />
          <Text style={styles.legendText}>Scheduled</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.dot, { backgroundColor: '#999' }]} />
          <Text style={styles.legendText}>Pending</Text>
        </View>
      </View>

      <View style={styles.scanList}>
        {SCAN_SCHEDULE.map((scan) => (
          <ScanScheduleItem
            key={scan.id}
            weekNumber={scan.weekNumber}
            scanType={scan.scanType}
            description={scan.description}
            date={scheduledScans[scan.id]}
            isCompleted={completedScans.includes(scan.id)}
            onPress={() => handleScanPress(scan.id)}
          />
        ))}
      </View>

      <TouchableOpacity
        style={styles.scheduleButton}
        onPress={() => navigation.navigate('AppointmentScheduler')}
      >
        <Text style={styles.scheduleButtonText}>Schedule New Scan</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCE4EC', // Light pastel pink
  },
  header: {
    padding: 20,
    backgroundColor: '#F8BBD0', // Soft pink surface
    borderBottomWidth: 1,
    borderBottomColor: '#E91E63', // Darker pink for subtle contrast
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#880E4F', // Deep pink for text contrast
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#AD1457', // Slightly darker pink for readability
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: '#FCE4EC', // Matching the background for seamless integration
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: '#D81B60',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 4,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
    color: '#880E4F', // Slightly darker pink for contrast
  },
  scanList: {
    padding: 16,
  },
  scheduleButton: {
    backgroundColor: '#D81B60', // Vibrant pink for CTA
    margin: 16,
    padding: 16,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#C2185B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  scheduleButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

