import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface EmergencyContactCardProps {
  title: string;
  phoneNumber: string;
  icon: string;
  onPress: () => void;
  isLoading?: boolean;
}

export const EmergencyContactCard = ({
  title,
  phoneNumber,
  icon,
  onPress,
  isLoading = false,
}: EmergencyContactCardProps) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      disabled={isLoading}
    >
      <View style={styles.iconContainer}>
        <Ionicons name={icon as any} size={24} color="#007AFF" />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.phoneNumber}>{phoneNumber}</Text>
      </View>
      {isLoading ? (
        <ActivityIndicator color="#007AFF" />
      ) : (
        <Ionicons name="call" size={24} color="#34C759" />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E3F2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  phoneNumber: {
    fontSize: 14,
    color: '#666',
  },
});
