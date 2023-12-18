import React from 'react';
import { useSelector } from 'react-redux';
import { View, Button, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const check = () => {
    const user = useSelector((state) => state.user.user);

    const logOut = () => {
        AsyncStorage.removeItem('email');
        AsyncStorage.removeItem('password');
        navigation.navigate('Login');
    }

    return (
        <View>
            {user && user.email && <Text>Welcome, {user.email}</Text>}
            {user && user._id && <Text>{user._id}</Text>}
            <Button title="log out" onPress={
                logOut
            } />
        </View>
    );
};

export default check;
