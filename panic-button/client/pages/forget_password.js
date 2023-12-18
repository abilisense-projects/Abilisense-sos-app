import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import PasswordValidation from "./components/password_validation";
// import EmailVerification from './components/forget_password/email_verification';
// import ResetPassword from './components/forget_password/reset_password';
// import ForgetPassword from './components/forget_password/forget_password'


const Stack = createStackNavigator();

export default function ForgetPassword() {

    return (
        <View style={styles.container}>

            <View style={styles.container}>
                {/* <NavigationContainer>
  <Stack.Navigator initialRouteName="ForgetPassword">
    <Stack.Screen name="EmailVerification" component={EmailVerification} />
    <Stack.Screen name="ResetPassword" component={ResetPassword} />
  </Stack.Navigator>
</NavigationContainer>

<StatusBar style="auto" /> */}
                <ForgetPassword></ForgetPassword>
                {/* <EmailVerification></EmailVerification> */}
            </View>
        </View>
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
