import React from 'react';
import { View, Text as RNText, StyleSheet, ScrollView } from 'react-native';
import { useMaternalHealth } from '../../contexts/MaternalHealthContext';

interface MaternalHealthData {
  systolicBP: number;
  diastolicBP: number;
  heartRate: number;
  bodyTemperature: number;
  bloodSugar: number;
  prevComplications: boolean;
  preexistingDiabetes: boolean;
  gestationalDiabetes: boolean;
  mentalHealth?: string;
  lastUpdated?: Date;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  section: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  recordCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  recordTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
    marginTop: 10,
  },
});

export const HealthRecords = () => {
  const { healthData } = useMaternalHealth();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <RNText style={styles.title}>Health Records</RNText>
        {healthData ? (
          <View style={styles.recordCard}>
            <RNText style={styles.recordTitle}>Current Vitals</RNText>
            <RNText>Blood Pressure: {healthData.systolicBP}/{healthData.diastolicBP} mmHg</RNText>
            <RNText>Heart Rate: {healthData.heartRate} bpm</RNText>
            <RNText>Body Temperature: {healthData.bodyTemperature}°C</RNText>
            <RNText>Blood Sugar: {healthData.bloodSugar} mg/dL</RNText>
            <RNText>Previous Complications: {healthData.prevComplications ? 'Yes' : 'No'}</RNText>
            <RNText>Pre-existing Diabetes: {healthData.preexistingDiabetes ? 'Yes' : 'No'}</RNText>
            <RNText>Gestational Diabetes: {healthData.gestationalDiabetes ? 'Yes' : 'No'}</RNText>
            <RNText>Mental Health Notes: {healthData.mentalHealth || 'None'}</RNText>
            <RNText style={styles.timestamp}>
              Last Updated: {healthData.lastUpdated?.toLocaleString()}
            </RNText>
          </View>
        ) : (
          <RNText>No health data available</RNText>
        )}
      </View>
    </ScrollView>
  );
};
