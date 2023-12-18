import { NavigationContainer } from "@react-navigation/native";
import SignUpPage from './pages/SignUpPage';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./pages/Login";
import ForgetPassword from "./pages/forget_password";
import check from "./pages/check";
import { Provider } from "react-redux";
import store from "./redux/store";
import HomeScreem from "./pages/HomeScreen";



const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUpPage" component={SignUpPage} />
          <Stack.Screen name="check" component={check} />
          <Stack.Screen name="HomeScreem" component={HomeScreem} />
          <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
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