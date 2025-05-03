import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export interface Alert {
  id: string;
  type: 'warning' | 'critical' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
}

interface AlertCardProps {
  alert: Alert;
  onPress: (alert: Alert) => void;
}

export const AlertCard = ({ alert, onPress }: AlertCardProps) => {
  const getAlertIcon = () => {
    switch (alert.type) {
      case 'critical':
        return 'warning';
      case 'warning':
        return 'alert-circle';
      default:
        return 'information-circle';
    }
  };

  const getAlertColor = () => {
    switch (alert.type) {
      case 'critical':
        return '#FF3B30';
      case 'warning':
        return '#FFB100';
      default:
        return '#007AFF';
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        !alert.isRead && styles.unread,
      ]}
      onPress={() => onPress(alert)}
    >
      <View style={[styles.iconContainer, { backgroundColor: getAlertColor() }]}>
        <Ionicons name={getAlertIcon()} size={24} color="white" />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{alert.title}</Text>
        <Text style={styles.message} numberOfLines={2}>
          {alert.message}
        </Text>
        <Text style={styles.timestamp}>
          {alert.timestamp.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </Text>
      </View>
      <Ionicons 
        name="chevron-forward" 
        size={20} 
        color="#999" 
        style={styles.chevron}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  unread: {
    backgroundColor: '#F8F8F8',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  contentContainer: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  message: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    lineHeight: 20,
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
  },
  chevron: {
    alignSelf: 'center',
  },
});
