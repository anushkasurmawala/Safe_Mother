import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, StyleProp, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface HealthIndicatorProps {
  title: string;
  value: string | number | null;  // Allow null in type
  unit?: string;
  status?: 'normal' | 'warning' | 'critical';
  icon?: string;
  loading?: boolean;
  containerStyle?: StyleProp<ViewStyle>;  // Add this line
}

export const HealthIndicatorCard = ({ 
  title, 
  value, 
  unit, 
  status = 'normal',
  icon = 'medical',
  loading = false,
  containerStyle  // Add this prop
}: HealthIndicatorProps) => {
  const getStatusColor = () => {
    switch (status) {
      case 'warning':
        return '#FFB100';
      case 'critical':
        return '#FF3B30';
      default:
        return '#34C759';
    }
  };

  const displayValue = value?.toString() || 'Not set';

  return (
    <View style={[styles.card, { borderLeftColor: getStatusColor() }, containerStyle]}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon as any} size={24} color="#666" />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>
        {loading ? (
          <ActivityIndicator size="small" />
        ) : (
          <Text style={styles.value}>
            {displayValue} {unit}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minWidth: '45%',
    borderLeftWidth: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 12,
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  unit: {
    fontSize: 14,
    color: '#666',
  },
});
