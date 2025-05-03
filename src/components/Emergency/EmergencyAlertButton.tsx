import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface EmergencyAlertButtonProps {
  onPress: () => void;
  isLoading?: boolean;
  label?: string;
  icon?: string;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'large';
}

export const EmergencyAlertButton = ({
  onPress,
  isLoading = false,
  label = 'SOS EMERGENCY',
  icon = 'warning',
  variant = 'primary',
  size = 'large',
}: EmergencyAlertButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        variant === 'secondary' && styles.secondaryButton,
        size === 'small' && styles.smallButton,
      ]}
      onPress={onPress}
      disabled={isLoading}
    >
      {isLoading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <View style={styles.content}>
          <Ionicons 
            name={icon as any} 
            size={size === 'large' ? 32 : 24} 
            color="#fff" 
          />
          <Text style={[
            styles.label,
            size === 'small' && styles.smallLabel,
          ]}>
            {label}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FF3B30',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  secondaryButton: {
    backgroundColor: '#FF9500',
  },
  smallButton: {
    padding: 12,
    borderRadius: 8,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  label: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  smallLabel: {
    fontSize: 16,
  },
});
