import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { FeatureHomeScreen } from '../screens/Features/FeatureHomeScreen';

// Import screens for the main features
import { RiskPredictionScreen } from '../screens/Features/RiskPredictionScreen';
import { AlertsScreen } from '../screens/Alerts/AlertsScreen';
import { DoctorOnDemandScreen } from '../screens/Features/DoctorOnDemandScreen';
import { EmergencyAlertScreen } from '../screens/Features/EmergencyAlertScreen';
import { AIBotScreen } from '../screens/AIBot/AIBotScreen';
import { ScanScheduleScreen } from '../screens/Features/ScanScheduleScreen';
import { ExerciseScreen } from '../screens/Features/ExerciseScreen';
import { VaccineGuideScreen } from '../screens/Features/VaccineGuideScreen';
import { AppointmentSchedulerScreen } from '../screens/Features/AppointmentSchedulerScreen';
import { MedicationReminderScreen } from '../screens/Features/MedicationReminderScreen';
import { VideoConsultationScreen } from '../screens/Features/VideoConsultationScreen';

export type MainStackParamList = {
  FeaturesHome: undefined;
  RiskPrediction: undefined;
  ScanSchedule: undefined;
  DoctorOnDemand: undefined;
  AppointmentScheduler: { doctorId?: string };
  EmergencyAlert: undefined;
  Exercise: undefined;
  MedicationReminder: undefined;
  VaccineGuide: undefined;
  VideoConsultation: {
    doctorId: string;
    doctorName: string;
    consultationFee: number;
  };
};

const Stack = createStackNavigator<MainStackParamList>();

export const MainStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#007AFF',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerShown: true
      }}
      initialRouteName="FeaturesHome"
    >
      <Stack.Screen 
        name="FeaturesHome" 
        component={FeatureHomeScreen}
        options={{ title: 'Features' }}
      />
      
      {/* Health Monitoring */}
      <Stack.Screen 
        name="RiskPrediction" 
        component={RiskPredictionScreen}
        options={{ title: 'Risk Assessment' }}
      />
      <Stack.Screen 
        name="ScanSchedule" 
        component={ScanScheduleScreen}
        options={{ title: 'Scan Schedule' }}
      />
      
      {/* Medical Services */}
      <Stack.Screen 
        name="DoctorOnDemand" 
        component={DoctorOnDemandScreen}
        options={{ title: 'Consult Doctor' }}
      />
      <Stack.Screen 
        name="AppointmentScheduler" 
        component={AppointmentSchedulerScreen}
        options={{ title: 'Schedule Appointment' }}
      />
      
      {/* Emergency & Alerts */}
      <Stack.Screen 
        name="EmergencyAlert" 
        component={EmergencyAlertScreen}
        options={{ 
          title: 'Emergency Alert',
          headerStyle: { backgroundColor: '#FF3B30' }
        }}
      />
      
      {/* Wellness */}
      <Stack.Screen 
        name="Exercise" 
        component={ExerciseScreen}
        options={{ title: 'Exercise & Yoga' }}
      />
      <Stack.Screen 
        name="MedicationReminder" 
        component={MedicationReminderScreen}
        options={{ title: 'Medication Reminder' }}
      />
      <Stack.Screen 
        name="VaccineGuide" 
        component={VaccineGuideScreen}
        options={{ title: 'Vaccine Guide' }}
      />
      <Stack.Screen 
        name="VideoConsultation" 
        component={VideoConsultationScreen}
        options={{ 
          title: 'Video Consultation',
          headerStyle: {
            backgroundColor: '#1a1a1a',
          },
        }}
      />
    </Stack.Navigator>
  );
};
