import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { formatDate } from '../../utils/dateUtils';

interface ScanScheduleItemProps {
  weekNumber: number;
  scanType: string;
  description: string;
  date?: Date;
  isCompleted?: boolean;
  onPress: () => void;
}

export const ScanScheduleItem = ({
  weekNumber,
  scanType,
  description,
  date,
  isCompleted = false,
  onPress,
}: ScanScheduleItemProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.weekBadge}>
        <Text style={styles.weekText}>Week {weekNumber}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.scanType}>{scanType}</Text>
        <Text style={styles.description}>{description}</Text>
        {date && (
          <Text style={styles.date}>
            Scheduled: {formatDate(date)}
          </Text>
        )}
      </View>
      <View style={styles.status}>
        {isCompleted ? (
          <Ionicons name="checkmark-circle" size={24} color="#34C759" />
        ) : (
          <Ionicons name="calendar-outline" size={24} color="#007AFF" />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  weekBadge: {
    backgroundColor: '#E3F2FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 12,
  },
  weekText: {
    color: '#007AFF',
    fontWeight: '600',
    fontSize: 14,
  },
  content: {
    flex: 1,
  },
  scanType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
  status: {
    marginLeft: 12,
  },
});
