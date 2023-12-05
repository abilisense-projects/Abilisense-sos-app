import React, { useState } from 'react';
import { StyleSheet, View, Button, TextInput } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

const ProblemType = () => {
    const [text, setText] = useState('');
    const [location, setLocation] = useState();

    const send = () => {
        findUserLocation();
        console.log(location);
        // const location = getLocation();
        // // Do something with the location data
        // console.log(location);
    };
    const findUserLocation = () => {
        Geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                console.log('User Location:', latitude, longitude);
                setLocation({ latitude: latitude, longitude: longitude })
                console.log(location)
               
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
            <Button
                onPress={send}
                title="problem 1"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
            />
            <Button
                onPress={send}
                title="problem 2"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
            />
            <Button
                onPress={send}
                title="problem 3"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
            />
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                placeholder="Enter text"
                onChangeText={newText => setText(newText)}
                value={text}
            />
            <Button
                onPress={send}
                title="Submit"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
            />
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
});


export default ProblemType;
