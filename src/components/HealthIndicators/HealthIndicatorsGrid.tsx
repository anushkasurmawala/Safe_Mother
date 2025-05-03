import React from 'react';
import { View, StyleSheet } from 'react-native';
import { HealthIndicatorCard } from './HealthIndicatorCard';
import { useMaternalHealth } from '../../contexts/MaternalHealthContext';

interface MaternalHealthData {
  systolicBP: number;
  diastolicBP: number;
  heartRate: number;
  bodyTemperature: number;
  weight: number;
  fetalHeartRate: number;
}

export const HealthIndicatorsGrid = () => {
  const { healthData } = useMaternalHealth();

  const determineStatus = (type: string, value: number | string | null): 'normal' | 'warning' | 'critical' => {
    if (!value) return 'normal';

    switch(type) {
      case 'bloodPressure':
        const systolic = healthData?.systolicBP ?? 0;
        const diastolic = healthData?.diastolicBP ?? 0;
        if (systolic >= 140 || diastolic >= 90) return 'critical';
        if (systolic >= 130 || diastolic >= 85) return 'warning';
        return 'normal';
      case 'heartRate':
        const heartRateValue = Number(value);
        if (heartRateValue < 60 || heartRateValue > 100) return 'warning';
        return 'normal';
      case 'bodyTemperature':
        const temp = Number(value);
        if (temp >= 38 || temp <= 35) return 'critical';
        if (temp >= 37.5) return 'warning';
        return 'normal';
      default:
        return 'normal';
    }
  };

  const formatBloodPressure = () => {
    return healthData?.systolicBP && healthData?.diastolicBP 
      ? `${healthData.systolicBP}/${healthData.diastolicBP}`
      : null;
  };

  return (
    <View style={styles.grid}>
      <HealthIndicatorCard
        title="Blood Pressure"
        value={formatBloodPressure()}
        unit="mmHg"
        icon="heart"
        status={determineStatus('bloodPressure', formatBloodPressure())}
      />
      <HealthIndicatorCard
        title="Heart Rate"
        value={healthData?.heartRate ?? null}
        unit="bpm"
        icon="heart-outline"
        status={determineStatus('heartRate', healthData?.heartRate ?? null)}
      />
      <HealthIndicatorCard
        title="Body Temperature"
        value={healthData?.bodyTemperature ?? null}
        unit="°C"
        icon="thermometer"
        status={determineStatus('bodyTemperature', healthData?.bodyTemperature ?? null)}
      />
      <HealthIndicatorCard
        title="Weight"
        value={healthData?.weight ?? null}
        unit="kg"
        icon="scale"
        status={determineStatus('weight', healthData?.weight ?? null)}
      />
      <HealthIndicatorCard
        title="Fetal Heart Rate"
        value={healthData?.fetalHeartRate ?? null}
        unit="bpm"
        icon="heart"
        status={determineStatus('fetalHeartRate', healthData?.fetalHeartRate ?? null)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
    padding: 16,
  },
});
