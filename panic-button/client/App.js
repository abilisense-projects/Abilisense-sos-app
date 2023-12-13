import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './pages/Login';

const Stack = createStackNavigator();

const App = () => {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          {/* <Stack.Screen name="ForgotPassword" component={ForgotPassword} /> */}
          {/* <Stack.Screen name="Register" component={Register} /> */}
        </Stack.Navigator>
      </NavigationContainer>
  );
};
export default App;