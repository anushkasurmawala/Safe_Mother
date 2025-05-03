import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface RiskPredictionResultProps {
  riskLevel: 'low' | 'medium' | 'high';
  score?: number;
  recommendations?: string[];
}

export const RiskPredictionResult = ({ 
  riskLevel, 
  score,
  recommendations = []
}: RiskPredictionResultProps) => {
  const getRiskColor = () => {
    switch (riskLevel) {
      case 'low':
        return '#34C759';
      case 'medium':
        return '#FFB100';
      case 'high':
        return '#FF3B30';
      default:
        return '#666';
    }
  };

  const getRiskIcon = () => {
    switch (riskLevel) {
      case 'low':
        return 'checkmark-circle';
      case 'medium':
        return 'alert-circle';
      case 'high':
        return 'warning';
      default:
        return 'help-circle';
    }
  };

  const getRiskMessage = () => {
    switch (riskLevel) {
      case 'low':
        return 'Your risk level is low. Continue with regular check-ups.';
      case 'medium':
        return 'Moderate risk detected. Consider more frequent check-ups.';
      case 'high':
        return 'High risk detected. Please consult your healthcare provider immediately.';
      default:
        return 'Unable to determine risk level.';
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.riskIndicator, { backgroundColor: getRiskColor() }]}>
        <Ionicons name={getRiskIcon()} size={40} color="white" />
        <Text style={styles.riskLevel}>
          {riskLevel.toUpperCase()} RISK
        </Text>
        {score !== undefined && (
          <Text style={styles.score}>
            Score: {score}
          </Text>
        )}
      </View>

      <Text style={styles.message}>{getRiskMessage()}</Text>

      {recommendations && recommendations.length > 0 && (
        <View style={styles.recommendationsContainer}>
          <Text style={styles.recommendationsTitle}>Recommendations:</Text>
          {recommendations.map((recommendation, index) => (
            <View key={index} style={styles.recommendationItem}>
              <Ionicons name="medical" size={20} color={getRiskColor()} />
              <Text style={styles.recommendationText}>{recommendation}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    padding: 16,
    width: width - 32,
    alignSelf: 'center',
  },
  riskIndicator: {
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  riskLevel: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
  },
  score: {
    color: 'white',
    fontSize: 18,
    marginTop: 4,
  },
  message: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  recommendationsContainer: {
    backgroundColor: '#F8F8F8',
    padding: 16,
    borderRadius: 8,
  },
  recommendationsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  recommendationText: {
    fontSize: 14,
    color: '#444',
    marginLeft: 8,
    flex: 1,
  },
});
