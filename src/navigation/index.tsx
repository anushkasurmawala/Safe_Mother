import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthNavigator } from './AuthNavigator';
import { TabNavigator } from './TabNavigator';

const RootStack = createStackNavigator();

export const RootNavigator = () => {
  // You can add authentication state check here
  const isAuthenticated = false; // Replace with actual auth state

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <RootStack.Screen name="Auth" component={AuthNavigator} />
        ) : (
          <RootStack.Screen name="Main" component={TabNavigator} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
