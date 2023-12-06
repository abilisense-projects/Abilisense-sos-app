import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

const SendAlert = ({ route }) => {
    const params = route.params;
    console.log(params);
    const [location, setLocation] = useState(null);

    useEffect(() => {
        findUserLocation();
    }, []);

    const findUserLocation = () => {
        Geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                console.log('User Location:', latitude, longitude);
                setLocation({ latitude: latitude, longitude: longitude });
            },
            error => {
                console.log('Error:', error.message);
                // Handle error
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    };

    return (
        <View style={styles.container}>
            <Text>
                Your location is:
            </Text>
            <Text>
                {location ? `Latitude: ${location.latitude}, Longitude: ${location.longitude}` : 'Fetching location...'}
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
