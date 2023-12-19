import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

// Import דפים ורכיבים
import SignUpPage from './pages/SignUpPage';
import HomeScreen from './pages/HomeScreen';
import HistoryPage from './pages/HistoryPage';
import SettingsPage from './pages/SettingsPage';
import AccessibilityPage from './pages/AccessibilityPage';
import SideBarMenu from './pages/SideBarMenu';
import LogOut from './pages/Logout';

const Drawer = createDrawerNavigator();
// const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={(props) => <SideBarMenu {...props} />}>
        {/* <Drawer.Screen name="SignUpPage" component={SignUpPage} options={{
          headerShown: false
        }} /> */}
        <Drawer.Screen name="Home" component={HomeScreen} options={{ title: "" }} />
        <Drawer.Screen name="History" component={HistoryPage} options={{ title: "" }} />
        <Drawer.Screen name="Settings" component={SettingsPage} options={{ title: "" }} />
        <Drawer.Screen name="LogOut" component={LogOut} options={{ title: "" }} />
        <Drawer.Screen name="Accessibility" component={AccessibilityPage} options={{ title: "" }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
