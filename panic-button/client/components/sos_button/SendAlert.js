import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

const SendAlert = ({ route }) => {
    const params = route.params;
    console.log(params);

    const addAlert = () => {
        //call to the func in node
    }

    return (
        <View style={styles.container}>
            <Text>
                Sending alert...
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default SendAlert;
