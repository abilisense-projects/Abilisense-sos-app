import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PasswordValidation from "./components/password_validation";
import EmailVerification from './components/forget_password/email_verification';
import ResetPassword from './components/forget_password/reset_password';
import ForgetPassword from './components/forget_password/forget_password'


const Stack = createStackNavigator();

export default function App() {

  return (
    <View style={styles.container}></View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
