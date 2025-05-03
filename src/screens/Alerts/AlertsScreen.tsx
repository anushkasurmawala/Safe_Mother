import React, { useState, useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  FlatList, 
  Text,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { AlertCard, Alert } from '../../components/Alerts/AlertCard';
import { Ionicons } from '@expo/vector-icons';

export const AlertsScreen = ({ navigation }: any) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  // Simulate fetching alerts - replace with actual API call
  const fetchAlerts = async () => {
    // Simulated API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Sample data - replace with actual data from your backend
    const mockAlerts: Alert[] = [
      {
        id: '1',
        type: 'critical',
        title: 'High Blood Pressure Alert',
        message: 'Your last blood pressure reading was above normal range. Please consult your healthcare provider.',
        timestamp: new Date(),
        isRead: false,
      },
      {
        id: '2',
        type: 'warning',
        title: 'Upcoming Appointment',
        message: 'You have a prenatal checkup scheduled for tomorrow at 10:00 AM.',
        timestamp: new Date(),
        isRead: true,
      },
      {
        id: '3',
        type: 'info',
        title: 'Medication Reminder',
        message: 'Time to take your prenatal vitamins.',
        timestamp: new Date(),
        isRead: false,
      },
    ];

    setAlerts(mockAlerts);
    setLoading(false);
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchAlerts().then(() => setRefreshing(false));
  }, []);

  const handleAlertPress = (alert: Alert) => {
    // Mark alert as read
    setAlerts(prevAlerts =>
      prevAlerts.map(a =>
        a.id === alert.id ? { ...a, isRead: true } : a
      )
    );
    
    // Navigate to relevant screen based on alert type
    // Add your navigation logic here
  };

  const filteredAlerts = filter === 'all' 
    ? alerts 
    : alerts.filter(alert => !alert.isRead);

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Ionicons name="notifications-off" size={48} color="#999" />
      <Text style={styles.emptyStateText}>No alerts to display</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'all' && styles.activeFilter]}
          onPress={() => setFilter('all')}
        >
          <Text style={[
            styles.filterText,
            filter === 'all' && styles.activeFilterText
          ]}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'unread' && styles.activeFilter]}
          onPress={() => setFilter('unread')}
        >
          <Text style={[
            styles.filterText,
            filter === 'unread' && styles.activeFilterText
          ]}>Unread</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredAlerts}
        renderItem={({ item }) => (
          <AlertCard alert={item} onPress={handleAlertPress} />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={renderEmptyState}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: 16,
    flexGrow: 1,
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
    borderRadius: 16,
    marginRight: 8,
  },
  activeFilter: {
    backgroundColor: '#007AFF',
  },
  filterText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
  },
  activeFilterText: {
    color: '#fff',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyStateText: {
    marginTop: 16,
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
});
