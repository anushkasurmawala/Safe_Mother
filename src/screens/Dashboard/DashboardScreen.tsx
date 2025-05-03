import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, RefreshControl, StyleSheet, Modal, TextInput, Button, Switch, Linking, Alert } from 'react-native';
import { useMaternalHealth } from '../../contexts/MaternalHealthContext';
import { HealthIndicatorCard } from '../../components/HealthIndicators/HealthIndicatorCard';
import { Ionicons } from '@expo/vector-icons';
import { NavigationProp } from '@react-navigation/native';
import { useUser } from '../../context/UserContext';
import { fetchAppointments, fetchAlerts, Appointment, Alert as AlertType } from '../../services/dashboardService';
import { getRelativeTime } from '../../utils/dateUtils';
import { globalStyles } from '../../styles/globalStyles';
import { typography } from '../../styles/typography';
import { colors } from '../../styles/colors';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { EmergencyAlertButton } from '../../components/Emergency/EmergencyAlertButton';
import { MaternalHealthData } from '../../types/health';
import { StyleProp, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp } from 'react-native-reanimated';

type UserData = {
  displayName?: string;
  email?: string;
  uid: string;
};

interface HealthIndicatorProps {
  title: string;
  value: string;
  unit: string;
  loading: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}

export const DashboardScreen = ({ navigation, route }: { navigation: NavigationProp<any>; route: any }) => {
  const { healthData, updateHealthData, loadHealthData, loading: healthLoading, saveHealthData } = useMaternalHealth();
  const { user } = useUser();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [alerts, setAlerts] = useState<AlertType[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showHealthInput, setShowHealthInput] = useState(false);
  const [newHealthData, setNewHealthData] = useState<Partial<MaternalHealthData>>({
    age: undefined,
    systolicBP: undefined,
    diastolicBP: undefined,
    bloodSugar: undefined,
    bodyTemperature: undefined,
    prevComplications: false,
    preexistingDiabetes: false,
    gestationalDiabetes: false,
    mentalHealth: '',
    heartRate: undefined
  });
  const [calling, setCalling] = useState(false);

  const loadDashboardData = async () => {
    if (user?.uid) {
      try {
        const [fetchedAppointments, fetchedAlerts] = await Promise.all([
          fetchAppointments(user.uid),
          fetchAlerts(user.uid),
          loadHealthData(user.uid)
        ]);
        setAppointments(fetchedAppointments);
        setAlerts(fetchedAlerts);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    }
  };

  const fetchUserData = async () => {
    if (user?.uid) {
      try {
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          setUserData(userDocSnap.data() as UserData);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    loadDashboardData();
    fetchUserData();
  }, [user?.uid]);

  useEffect(() => {
    loadDashboardData();
    fetchUserData();
  }, [user?.uid]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (route.params?.appointmentAdded) {
        loadDashboardData();
        navigation.setParams({ appointmentAdded: undefined });
      }
    });

    return unsubscribe;
  }, [navigation, route.params?.appointmentAdded]);

  const handleHealthDataSubmit = async () => {
    if (!user?.uid) {
      console.error('No user ID found');
      return;
    }

    try {
      const dataToSubmit = {
        uid: user.uid,
        ...newHealthData,
      } as MaternalHealthData;

      await saveHealthData(dataToSubmit);
      setShowHealthInput(false);
      setNewHealthData({});
      
      Alert.alert(
        'Success',
        'Health data updated successfully',
        [{ text: 'OK' }]
      );
    } catch (error) {
      console.error('Error submitting health data:', error);
      Alert.alert(
        'Error',
        'Failed to update health data. Please try again.',
        [{ text: 'OK' }]
      );
    }
  };

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

  if (loading) {
    return (
      <View style={[globalStyles.container, globalStyles.centerContent]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView 
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
          />
        }
      >
        <LinearGradient
          colors={[colors.primary, colors.primaryLight]}
          style={styles.welcomeGradient}
        >
          <View style={styles.welcomeContent}>
            <Text style={styles.welcomeText}>Hello {userData?.displayName || 'User'}!</Text>
            <Text style={styles.weekText}>
              Week {healthData?.gestationalAge || 'N/A'} of Pregnancy
            </Text>
          </View>
        </LinearGradient>

        <Animated.View 
          entering={FadeInUp.delay(200)}
          style={styles.emergencyContainer}
        >
          <EmergencyAlertButton
            onPress={() => handleEmergencyCall('911')}
            isLoading={calling}
            label="EMERGENCY SOS"
            icon="warning"
            variant="primary"
            size="large"
          />
        </Animated.View>

        <Animated.View 
          entering={FadeInUp.delay(400)}
          style={styles.indicatorsContainer}
        >
          <Text style={styles.sectionTitle}>Health Indicators</Text>
          <View style={styles.healthGrid}>
            <HealthIndicatorCard 
              title="Blood Pressure" 
              value={`${healthData?.systolicBP || '--'}/${healthData?.diastolicBP || '--'}`} 
              unit="mmHg" 
              loading={healthLoading}
              containerStyle={styles.indicatorCard}
            />
            <HealthIndicatorCard 
              title="Heart Rate" 
              value={healthData?.heartRate?.toString() || 'Not set'} 
              unit="bpm" 
              loading={healthLoading}
              containerStyle={styles.indicatorCard}
            />
            <HealthIndicatorCard 
              title="Blood Sugar" 
              value={healthData?.bloodSugar?.toString() || 'Not set'}
              unit="mg/dL"
              loading={healthLoading}
              containerStyle={styles.indicatorCard}
            />
            <HealthIndicatorCard 
              title="Temperature" 
              value={healthData?.bodyTemperature?.toString() || 'Not set'}
              unit="°C"
              loading={healthLoading}
              containerStyle={styles.indicatorCard}
            />
          </View>
        </Animated.View>

        <Animated.View 
          entering={FadeInUp.delay(600)}
          style={styles.appointmentsContainer}
        >
          <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
          {appointments.length > 0 ? (
            appointments.map(appointment => (
              <TouchableOpacity 
                key={appointment.id} 
                style={styles.appointmentCard}
                onPress={() => navigation.navigate('Features', { screen: 'AppointmentScheduler' })}
              >
                <LinearGradient
                  colors={[colors.white, colors.primaryLight + '10']}
                  style={styles.appointmentContent}
                >
                  <View style={styles.appointmentContent}>
                    <View style={styles.appointmentIcon}>
                      <Ionicons name="calendar" size={24} color={colors.primary} />
                    </View>
                    <View style={styles.appointmentDetails}>
                      <Text style={styles.appointmentTitle}>{appointment.type}</Text>
                      <Text style={styles.appointmentDoctor}>{appointment.doctor}</Text>
                      <Text style={styles.appointmentTime}>{appointment.date} at {appointment.time}</Text>
                    </View>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noAppointments}>No upcoming appointments</Text>
          )}
        </Animated.View>

        <TouchableOpacity 
          style={styles.floatingButton}
          onPress={() => setShowHealthInput(true)}
        >
          <LinearGradient
            colors={[colors.accent, colors.primary]}
            style={styles.gradientButton}
          >
            <Ionicons name="add-circle-outline" size={24} color={colors.white} />
            <Text style={styles.buttonText}>Add Health Data</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={showHealthInput} animationType="slide">
        <View style={styles.modalContainer}>
          <LinearGradient
            colors={[colors.primary, colors.primaryLight]}
            style={styles.modalHeader}
          >
            <Text style={styles.modalTitle}>Enter Today's Health Data</Text>
            <TouchableOpacity 
              onPress={() => setShowHealthInput(false)}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={24} color={colors.white} />
            </TouchableOpacity>
          </LinearGradient>
          
          <ScrollView style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Age (in years)"
              placeholderTextColor={colors.grey[400]}
              keyboardType="numeric"
              value={newHealthData.age?.toString() || ''}
              onChangeText={(text) => setNewHealthData(prev => ({ 
                ...prev, 
                age: text ? parseInt(text) : undefined 
              }))}
            />

            <TextInput
              style={styles.input}
              placeholder="Systolic BP (Upper number, e.g. 120)"
              placeholderTextColor={colors.grey[400]}
              keyboardType="numeric"
              value={newHealthData.systolicBP?.toString() || ''}
              onChangeText={(text) => setNewHealthData(prev => ({ 
                ...prev, 
                systolicBP: text ? parseInt(text) : undefined 
              }))}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Diastolic BP (Lower number, e.g. 80)"
              placeholderTextColor={colors.grey[400]}
              keyboardType="numeric"
              value={newHealthData.diastolicBP?.toString() || ''}
              onChangeText={(text) => setNewHealthData(prev => ({ 
                ...prev, 
                diastolicBP: text ? parseInt(text) : undefined 
              }))}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Blood Sugar (mg/dL, Normal range: 70-140)"
              placeholderTextColor={colors.grey[400]}
              keyboardType="numeric"
              value={newHealthData.bloodSugar?.toString() || ''}
              onChangeText={(text) => setNewHealthData(prev => ({ 
                ...prev, 
                bloodSugar: text ? parseFloat(text) : undefined 
              }))}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Body Temperature (°C, Normal range: 36.5-37.5)"
              placeholderTextColor={colors.grey[400]}
              keyboardType="numeric"
              value={newHealthData.bodyTemperature?.toString() || ''}
              onChangeText={(text) => setNewHealthData(prev => ({ 
                ...prev, 
                bodyTemperature: text ? parseFloat(text) : undefined 
              }))}
            />

            <TextInput
              style={styles.input}
              placeholder="Heart Rate (beats per minute, Normal: 60-100)"
              placeholderTextColor={colors.grey[400]}
              keyboardType="numeric"
              value={newHealthData.heartRate?.toString() || ''}
              onChangeText={(text) => setNewHealthData(prev => ({ 
                ...prev, 
                heartRate: text ? parseInt(text) : undefined 
              }))}
            />

            <View style={styles.checkboxContainer}>
              <Text style={styles.label}>Previous Complications</Text>
              <Switch
                value={newHealthData.prevComplications}
                onValueChange={(value) => setNewHealthData(prev => ({ ...prev, prevComplications: value }))}
              />
            </View>

            <View style={styles.checkboxContainer}>
              <Text style={styles.label}>Preexisting Diabetes</Text>
              <Switch
                value={newHealthData.preexistingDiabetes}
                onValueChange={(value) => setNewHealthData(prev => ({ ...prev, preexistingDiabetes: value }))}
              />
            </View>

            <View style={styles.checkboxContainer}>
              <Text style={styles.label}>Gestational Diabetes</Text>
              <Switch
                value={newHealthData.gestationalDiabetes}
                onValueChange={(value) => setNewHealthData(prev => ({ ...prev, gestationalDiabetes: value }))}
              />
            </View>

            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Mental Health Notes"
              multiline
              numberOfLines={3}
              value={newHealthData.mentalHealth}
              onChangeText={(text) => setNewHealthData(prev => ({ ...prev, mentalHealth: text }))}
            />

            <View style={styles.buttonContainer}>
              <Button title="Submit" onPress={handleHealthDataSubmit} />
              <Button title="Cancel" onPress={() => setShowHealthInput(false)} />
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  welcomeGradient: {
    padding: 24,
    height: 220,
    justifyContent: 'flex-end',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  welcomeContent: {
    paddingTop: 60,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: '600',
    color: colors.white,
    marginBottom: 8,
  },
  weekText: {
    fontSize: 18,
    color: colors.white,
    opacity: 0.9,
  },
  emergencyContainer: {
    marginTop: -30,
    marginHorizontal: 20,
    marginBottom: 45,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: colors.white,
    elevation: 8,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    zIndex: 2,
  },
  indicatorsContainer: {
    marginTop: -20,
    marginHorizontal: 20,
    padding: 20,
    backgroundColor: colors.white,
    borderRadius: 24,
    elevation: 4,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    zIndex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 16,
  },
  healthGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  indicatorCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 16,
    elevation: 2,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  appointmentsContainer: {
    marginTop: 24,
    marginHorizontal: 20,
    padding: 20,
    backgroundColor: colors.white,
    borderRadius: 24,
  },
  appointmentCard: {
    marginBottom: 16,
    borderRadius: 16,
    backgroundColor: colors.surface,
    overflow: 'hidden',
  },
  appointmentContent: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  appointmentIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appointmentDetails: {
    flex: 1,
    marginLeft: 16,
  },
  appointmentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 4,
  },
  appointmentDoctor: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  appointmentTime: {
    fontSize: 13,
    color: colors.text.tertiary,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 32,
    right: 20,
    left: 20,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  gradientButton: {
    padding: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  modalHeader: {
    padding: 24,
    paddingTop: 60,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.white,
    marginBottom: 8,
  },
  closeButton: {
    position: 'absolute',
    top: 60,
    right: 24,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    padding: 24,
  },
  input: {
    backgroundColor: colors.surface,
    padding: 16,
    marginVertical: 8,
    borderRadius: 16,
    fontSize: 16,
    color: colors.text.primary,
    borderWidth: 1,
    borderColor: colors.border,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    marginVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  label: {
    fontSize: 16,
    color: colors.text.primary,
    fontWeight: '500',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    marginTop: 32,
    marginBottom: 24,
    gap: 12,
  },
  noAppointments: {
    textAlign: 'center',
    color: colors.text.tertiary,
    fontSize: 15,
    paddingVertical: 20,
  },
});

export { useMaternalHealth };