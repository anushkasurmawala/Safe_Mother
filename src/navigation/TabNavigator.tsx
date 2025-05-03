import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { DashboardScreen } from '../screens/Dashboard/DashboardScreen';
import { AlertsScreen } from '../screens/Alerts/AlertsScreen';
import { AIBotScreen } from '../screens/AIBot/AIBotScreen';
import { ProfileScreen } from '../screens/Profile/ProfileScreen';
import { MainStackNavigator } from './MainStackNavigator';

const colors = {
  primary: '#FF1493',    // Deep Pink
  secondary: '#9932CC',  // Dark Orchid
  background: '#FFF0F5', // Lavender Blush
  white: '#ffffff',
  text: {
    active: '#FF1493',   // Deep Pink
    inactive: '#DDA0DD', // Plum
  },
  border: '#FFD9E3',     // Light Pink
  shadowColor: 'rgba(255, 20, 147, 0.2)', // Pink Shadow
  navbar: '#9932CC',     // Dark Orchid
};

export type TabParamList = {
  Dashboard: undefined;
  Features: undefined;
  Alerts: undefined;
  AIBot: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          switch (route.name) {
            case 'Dashboard':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Features':
              iconName = focused ? 'grid' : 'grid-outline';
              break;
            case 'Alerts':
              iconName = focused ? 'notifications' : 'notifications-outline';
              break;
            case 'AIBot':
              iconName = focused ? 'chatbubble' : 'chatbubble-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
            default:
              iconName = 'help';
          }
          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        headerShown: route.name === 'Features' ? false : true,
        tabBarActiveTintColor: colors.text.active,
        tabBarInactiveTintColor: colors.text.inactive,
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopColor: colors.border,
          borderTopWidth: 2,
          elevation: 8,
          shadowColor: colors.shadowColor,
          borderRadius: 20,
          marginHorizontal: 10,
          marginBottom: 10,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },
        headerStyle: {
          backgroundColor: colors.navbar,
          elevation: 6,
          shadowColor: colors.shadowColor,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        },
        headerTintColor: colors.white,
        headerTitleStyle: {
          fontWeight: '700',
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Home' }} />
      <Tab.Screen name="Features" component={MainStackNavigator} options={{ title: 'Features', headerShown: false }} />
      <Tab.Screen name="Alerts" component={AlertsScreen} options={{ title: 'Alerts' }} />
      <Tab.Screen name="AIBot" component={AIBotScreen} options={{ title: 'AI Assistant' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
    </Tab.Navigator>
  );
};
