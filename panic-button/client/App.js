import store from "./redux/store";
import { Provider } from "react-redux";
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SignUpPage from './pages/SignUpPage';
import HomeScreen from './pages/HomeScreen';
import HistoryPage from './pages/HistoryPage';
import SettingsPage from './pages/SettingsPage';
import AccessibilityPage from './pages/AccessibilityPage';
import SideBarMenu from './pages/SideBarMenu';
import LogOut from './pages/Logout';
import Login from './pages/Login';

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Drawer.Navigator drawerContent={(props) => <SideBarMenu {...props} />}>
        <Drawer.Screen name="SignUpPage" component={SignUpPage} options={{
          headerShown: false
        }} />
        <Drawer.Screen name="Login" component={Login} options={{
          headerShown: false
        }} />
        <Drawer.Screen name="Home" component={HomeScreen} options={{ title: "" }} />
        <Drawer.Screen name="History" component={HistoryPage} options={{ title: "" }} />
        <Drawer.Screen name="Settings" component={SettingsPage} options={{ title: "" }} />
        <Drawer.Screen name="LogOut" component={LogOut} options={{ title: "" }} />
        <Drawer.Screen name="Accessibility" component={AccessibilityPage} options={{ title: "" }} />
      </Drawer.Navigator>
    </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;