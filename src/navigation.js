import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth } from './hooks/useAuth';

// Screens
import LoginScreen from './screens/LoginScreen';
import ClientDashboard from './screens/ClientDashboard';
import CoachDashboard from './screens/CoachDashboard';
import CheckInScreen from './screens/CheckInScreen';
import ProfileScreen from './screens/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const ClientTabs = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: {
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#e5e7eb',
      },
    }}
  >
    <Tab.Screen
      name="Dashboard"
      component={ClientDashboard}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="home" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Check-In"
      component={CheckInScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="check-circle" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="user" size={size} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

const CoachTabs = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: {
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#e5e7eb',
      },
    }}
  >
    <Tab.Screen
      name="Clients"
      component={CoachDashboard}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="users" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="user" size={size} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

export const Navigation = () => {
  const { user, userRole, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          // Auth Stack
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          // Role-based Stack
          <>
            {userRole === 'client' ? (
              <Stack.Screen name="ClientTabs" component={ClientTabs} />
            ) : (
              <Stack.Screen name="CoachTabs" component={CoachTabs} />
            )}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
