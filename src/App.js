import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './contexts/AuthContext';
import Navigation from './navigation';
import { StatusBar } from 'react-native';

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <Navigation />
      </AuthProvider>
    </SafeAreaProvider>
  );
}
