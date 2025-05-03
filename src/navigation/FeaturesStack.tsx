import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DoctorOnDemandScreen } from '../screens/Features/DoctorOnDemandScreen';
import { AppointmentSchedulerScreen } from '../screens/Features/AppointmentSchedulerScreen';

const Stack = createStackNavigator();

export const FeaturesStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="DoctorOnDemand" 
        component={DoctorOnDemandScreen}
        options={{ title: 'Find a Doctor' }}
      />
      <Stack.Screen 
        name="AppointmentScheduler" 
        component={AppointmentSchedulerScreen}
        options={{ title: 'Schedule Appointment' }}
      />
    </Stack.Navigator>
  );
};
