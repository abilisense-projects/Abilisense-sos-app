import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './pages/Login';
import store from './redux/store';
import { Provider } from 'react-redux';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          {/* <Stack.Screen name="ForgotPassword" component={ForgotPassword} /> */}
          {/* <Stack.Screen name="Register" component={Register} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};
export default App;