import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import SosButton from '../components/sos_button/SosButton';
import Status from '../components/sos_button/Status';
import ProblemType from '../components/sos_button/ProblemType';
import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';

const Stack = createStackNavigator();

const HomeScreem = () => {
    console.log("home")
    return (
        // <View>
        <NavigationContainer>
            <Stack.Navigator initialRouteName='SosButton'>
                <Stack.Screen name="SosButton" component={SosButton} />
                <Stack.Screen name="Status" component={Status} />
                <Stack.Screen name="ProblemType" component={ProblemType} />
            </Stack.Navigator>
        </NavigationContainer>
        // </View>
    );
};
export default HomeScreem;