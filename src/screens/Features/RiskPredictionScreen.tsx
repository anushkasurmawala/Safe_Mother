import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useMaternalHealth } from '../../contexts/MaternalHealthContext';
import { MaternalHealthData } from '../../types/health';  // Import the interface

export const RiskPredictionScreen = () => {
  const { healthData } = useMaternalHealth();
  const [riskScore, setRiskScore] = useState<number | null>(null);

  const analyzeRisks = () => {
    const risks: string[] = [];
    
    if (!healthData) return risks;

    // Risk level from ML model
    if (healthData.riskLevel === 'high') {
      risks.push('High risk pregnancy detected by AI analysis');
    }
    
    // Blood Pressure Check
    if (healthData.systolicBP > 140 || healthData.diastolicBP > 90) {
      risks.push('High blood pressure detected');
    }
    
    // Heart Rate Check
    if ((healthData?.heartRate ?? 0) > 100) {
      risks.push('Elevated heart rate');
    }
    
    // Temperature Check
    if ((healthData?.bodyTemperature ?? 0) >= 38) {
      risks.push('Elevated body temperature');
    }
    
    // Blood Sugar Check
    if ((healthData?.bloodSugar ?? 0) > 140) {
      risks.push('High blood sugar level');
    }
    
    // Diabetes Related Risks
    if (healthData?.preexistingDiabetes || healthData?.gestationalDiabetes) {
      risks.push('Diabetes-related complications risk');
    }
    
    // Previous Complications
    if (healthData?.prevComplications) {
      risks.push('Risk due to previous pregnancy complications');
    }

    return risks;
  };

  const risks = analyzeRisks();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>Risk Assessment</Text>
        {healthData?.riskLevel && (
          <View style={[styles.riskLevelContainer, 
            healthData.riskLevel === 'high' ? styles.highRisk : styles.lowRisk]}>
            <Text style={styles.riskLevelText}>
              Overall Risk Level: {healthData.riskLevel.toUpperCase()}
            </Text>
            <Text style={styles.lastUpdated}>
              Last updated: {new Date(healthData.lastUpdated || '').toLocaleDateString()}
            </Text>
          </View>
        )}
        <View style={styles.healthStats}>
          <Text style={styles.statItem}>Blood Pressure: {healthData?.systolicBP}/{healthData?.diastolicBP} mmHg</Text>
          <Text style={styles.statItem}>Heart Rate: {healthData?.heartRate || 'N/A'} bpm</Text>
          <Text style={styles.statItem}>Body Temperature: {healthData?.bodyTemperature || 'N/A'}°C</Text>
          <Text style={styles.statItem}>Blood Sugar: {healthData?.bloodSugar || 'N/A'} mg/dL</Text>
          <Text style={styles.statItem}>Previous Complications: {healthData?.prevComplications ? 'Yes' : 'No'}</Text>
          <Text style={styles.statItem}>Pre-existing Diabetes: {healthData?.preexistingDiabetes ? 'Yes' : 'No'}</Text>
          <Text style={styles.statItem}>Gestational Diabetes: {healthData?.gestationalDiabetes ? 'Yes' : 'No'}</Text>
          <Text style={styles.statItem}>Mental Health Status: {healthData?.mentalHealth || 'Not provided'}</Text>
        </View>

        <View style={styles.risksContainer}>
          <Text style={styles.subtitle}>Identified Risks:</Text>
          {risks.length > 0 ? (
            risks.map((risk, index) => (
              <Text key={index} style={styles.riskItem}>{risk}</Text>
            ))
          ) : (
            <Text style={styles.noRisk}>No immediate risks detected</Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

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
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
  },
  healthStats: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  risksContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
  },
  riskItem: {
    color: '#FF3B30',
    marginVertical: 5,
  },
  noRisk: {
    color: '#34C759',
    marginVertical: 5,
  },
  statItem: {
    fontSize: 16,
    marginVertical: 4,
    color: '#333',
  },
  riskLevelContainer: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  highRisk: {
    backgroundColor: '#FFE5E5',
  },
  lowRisk: {
    backgroundColor: '#E5FFE5',
  },
  riskLevelText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  lastUpdated: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
});
