import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { globalStyles } from '../../styles/globalStyles';
import { typography } from '../../styles/typography';
import { colors } from '../../styles/colors';
import { spacing } from '../../styles/globalStyles';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - spacing.md * 3) / 2;

export const FeatureHomeScreen = () => {
  const navigation = useNavigation();

  const features = [
    { name: 'Risk Assessment', route: 'RiskPrediction', icon: 'warning-outline', color: colors.warning },
    { name: 'Consult Doctor', route: 'DoctorOnDemand', icon: 'medical-outline', color: colors.primary },
    { name: 'Emergency Alert', route: 'EmergencyAlert', icon: 'alert-circle-outline', color: colors.emergency },
    { name: 'Scan Schedule', route: 'ScanSchedule', icon: 'calendar-outline', color: colors.schedule },
    { name: 'Exercise & Yoga', route: 'Exercise', icon: 'fitness-outline', color: colors.secondary },
    { name: 'Medication', route: 'MedicationReminder', icon: 'time-outline', color: colors.info },
    { name: 'Vaccine Guide', route: 'VaccineGuide', icon: 'shield-checkmark-outline', color: colors.accent },
    { name: 'Appointments', route: 'AppointmentScheduler', icon: 'calendar-number-outline', color: colors.primaryDark },
  ];

  return (
    <View style={globalStyles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={typography.h1}>Maternal Care</Text>
        <View style={styles.grid}>
          {features.map((feature, index) => (
            <TouchableOpacity
              key={index}
              style={styles.card}
              onPress={() => navigation.navigate(feature.route as never)}
            >
              <View style={[styles.iconContainer, { backgroundColor: feature.color + '20' }]}>
                <Ionicons name={feature.icon as any} size={32} color={feature.color} />
              </View>
              <Text style={styles.featureText}>{feature.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: spacing.md,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: spacing.md,
    marginBottom: spacing.md,
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    borderWidth: 1,
    borderColor: colors.primaryLight,
  },
  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
    borderWidth: 2,
    borderColor: colors.primaryLight,
  },
  featureText: {
    ...typography.bodySmall,
    textAlign: 'center',
    fontWeight: '600',
    color: colors.primary,
    marginTop: spacing.xs,
  },
});
