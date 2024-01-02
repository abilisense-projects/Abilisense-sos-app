import React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';



const ResetSuccessfully = ({navigation}) => {
    const handleNavigation = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: "Login" }]
        });
    };
    return (
        <View>
            <Text>Your password has been reset successfully!</Text>
            <Text>Log In again with your new password</Text>
            <Button title='Log In Again' onPress={() => handleNavigation()}></Button>
        </View>
    );
};



export default ResetSuccessfully;