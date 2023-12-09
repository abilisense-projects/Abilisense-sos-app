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

    const sendAlert = () => {
        fetch('URL_של_השרת_המקבל_את_הנתונים', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // כאן יש לציין טיפוס הנתונים שאתה שולח, לדוגמה JSON
            },
            body: JSON.stringify({ // כאן יש להמיר את הנתונים לפורמט הנדרש
                key1: 'value1',
                key2: 'value2'
                // ניתן להוסיף כמה שדות שתרצה
            })
        })
            .then(response => {
                // טיפול בתשובה מהשרת
                console.log(response);
            })
            .catch(error => {
                // טיפול בשגיאות
                console.error('Error:', error);
            });

    }

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
