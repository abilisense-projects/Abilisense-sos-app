import { NavigationContainer } from "@react-navigation/native";
import SignUpPage from './pages/SignUpPage';
import React from 'react';
import { StyleSheet} from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import store from "./redux/store";
import { Provider } from "react-redux";

const Stack = createStackNavigator();

export default function App() {

  return (
    <Provider store={store}>
    <NavigationContainer>
     <Stack.Navigator>
      <Stack.Screen name="SignUpPage" component={SignUpPage} />
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