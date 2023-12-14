import React from 'react';
import { useSelector } from 'react-redux';
import { View, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const check = () => {
    const user = useSelector((state) => state.user.user);
    console.log(user)
    const logOut = () => {
        AsyncStorage.removeItem('token');
        navigation.navigate('Login');
    }

    return (
        <View>
            <P>Welcome, {user.name}</P>
            <p>{user._id}</p>
            <Button title="log out" onPress={
                logOut
            } />
        </View>
    );
};

export default check;
