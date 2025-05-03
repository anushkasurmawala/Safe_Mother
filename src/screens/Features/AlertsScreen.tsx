import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useMaternalHealth } from '../../contexts/MaternalHealthContext';

export const AlertsScreen = () => {
  const { healthData } = useMaternalHealth();

  const generateAlerts = () => {
    const alerts = [];
    // Blood pressure alert
    const [systolic] = healthData.bloodPressure.split('/');
    if (parseInt(systolic) > 140) {
      alerts.push({
        id: '1',
        type: 'High Priority',
        message: 'Elevated blood pressure detected',
        timestamp: new Date().toISOString(),
      });
    }
    // Add more health condition checks and alerts
    return alerts;
  };

  const alerts = generateAlerts();

  return (
    <View style={styles.container}>
      <FlatList
        data={alerts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.alertCard}>
            <Text style={styles.alertType}>{item.type}</Text>
            <Text style={styles.alertMessage}>{item.message}</Text>
            <Text style={styles.timestamp}>{new Date(item.timestamp).toLocaleString()}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.noAlerts}>No active alerts</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 15,
  },
  alertCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  alertType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF3B30',
  },
  alertMessage: {
    fontSize: 14,
    marginTop: 5,
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  noAlerts: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
});
