import { StyleSheet } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import Login from './pages/Login';

import SignUpPage from './pages/SignUpPage';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import PasswordValidation from "./components/password_validation";
import EmailVerification from './components/forget_password/email_verification';
import ResetPassword from './components/forget_password/reset_password';
import ForgetPassword from './components/forget_password/forget_password'


const Stack = createStackNavigator();

const App = () => {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUpPage" component={SignUpPage} />
          {/* <Stack.Screen name="ForgotPassword" component={ForgotPassword} /> */}
          {/* <Stack.Screen name="Register" component={Register} /> */}
        </Stack.Navigator>
      </NavigationContainer>
 
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

