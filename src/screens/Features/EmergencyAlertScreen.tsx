import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Linking,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { EmergencyContactCard } from '../../components/Emergency/EmergencyContactCard';
import { EmergencyAlertButton } from '../../components/Emergency/EmergencyAlertButton';

export const EmergencyAlertScreen = () => {
  const [calling, setCalling] = useState(false);

  const handleEmergencyCall = async (phoneNumber: string) => {
    try {
      setCalling(true);
      const url = `tel:${phoneNumber}`;
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Phone call not supported');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to make emergency call');
    } finally {
      setCalling(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Emergency Services</Text>
        <Text style={styles.subtitle}>
          Contact emergency services immediately if you experience:
        </Text>
      </View>

      <View style={styles.warningSection}>
        <View style={styles.warningItem}>
          <Ionicons name="warning" size={24} color="#FF3B30" />
          <Text style={styles.warningText}>Severe abdominal pain</Text>
        </View>
        <View style={styles.warningItem}>
          <Ionicons name="warning" size={24} color="#FF3B30" />
          <Text style={styles.warningText}>Heavy bleeding</Text>
        </View>
        <View style={styles.warningItem}>
          <Ionicons name="warning" size={24} color="#FF3B30" />
          <Text style={styles.warningText}>Severe headache or vision changes</Text>
        </View>
      </View>

      <View style={styles.contactsSection}>
        <EmergencyContactCard
          title="Emergency Ambulance"
          phoneNumber="911"
          icon="ambulance"
          onPress={() => handleEmergencyCall('911')}
          isLoading={calling}
        />

        <EmergencyContactCard
          title="Hospital Emergency"
          phoneNumber="1-800-555-0123"
          icon="medical"
          onPress={() => handleEmergencyCall('18005550123')}
          isLoading={calling}
        />

        <EmergencyContactCard
          title="24/7 Maternity Helpline"
          phoneNumber="1-800-555-0199"
          icon="call"
          onPress={() => handleEmergencyCall('18005550199')}
          isLoading={calling}
        />
      </View>

      <EmergencyAlertButton
        onPress={() => handleEmergencyCall('911')}
        isLoading={calling}
      />

      <EmergencyAlertButton
        onPress={() => handleEmergencyCall('108')}
        label="CALL AMBULANCE"
        icon="ambulance"
        variant="secondary"
        size="small"
        isLoading={calling}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  warningSection: {
    backgroundColor: '#FFF5F5',
    padding: 20,
    margin: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFE5E5',
  },
  warningItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  warningText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
  },
  contactsSection: {
    padding: 16,
    gap: 12,
  },
  sosButton: {
    backgroundColor: '#FF3B30',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    margin: 16,
    borderRadius: 12,
    gap: 12,
  },
  sosButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
