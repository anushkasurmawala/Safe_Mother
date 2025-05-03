import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthNavigator } from './src/navigation/AuthNavigator';
import { TabNavigator } from './src/navigation/TabNavigator';
import { useNotifications } from './src/hooks/useNotifications';
import { AuthProvider } from './src/contexts/AuthContext';
import { UserProvider } from './src/context/UserContext';
import { useAuth } from './src/hooks/useAuth';
import { MaternalHealthProvider } from './src/contexts/MaternalHealthContext';
import './src/config/firebase';  // This imports and initializes Firebase
import { registerRootComponent } from 'expo';

const RootStack = createStackNavigator();

function RootNavigator() {
  const { user } = useAuth();

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        <RootStack.Screen 
          name="Auth" 
          component={AuthNavigator}
        />
      ) : (
        <RootStack.Screen 
          name="MainApp" 
          component={TabNavigator}
        />
      )}
    </RootStack.Navigator>
  );
}

export default function App() {
  useNotifications();

  return (
    <AuthProvider>
      <UserProvider>
        <MaternalHealthProvider>
          {/* Apply global background color */}
          <View style={styles.container}>
            <NavigationContainer>
              <RootNavigator />
              <StatusBar style="auto" />
            </NavigationContainer>
          </View>
        </MaternalHealthProvider>
      </UserProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink', // Change this to any color
  },
});

// Register the root component before exporting
registerRootComponent(App);
