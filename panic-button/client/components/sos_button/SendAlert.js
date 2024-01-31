import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import { SERVER_BASE_URL } from '@env';
import { useSelector } from 'react-redux';

const SendAlert = ({ onStepChange, alert, setAlertId }) => {
    const [alertSent, setAlertSent] = useState();
    const user = useSelector((state) => state.userReducer.user);
    useEffect(() => {
        const addAlert = async () => {
            const url = `${SERVER_BASE_URL}/api/alerts/add-alert/`;

            const alertData = {
                patient: user._id,
                distressDescription: alert.problem,
                status: 'not treated',
                location: alert.location,
                level: alert.level,
            };
            console.log('alert data', alertData)
            try {
                const response = await axios.post(url, alertData);
                console.log('Response from server: ', response.data);
                setAlertSent(true);
                setAlertId(response.data._id);
                // setTimeout(() => {
                //     onStepChange();
                // }, 5000);

            } catch (error) {
                console.error('Error sending data to server:', error);
                setAlertSent(false);

            }
        };

        addAlert();
    }, []);

    return (
        <View style={styles.container}>
            {alertSent != null && <Text>
                {alertSent ? 'Alert sent successfully!' : 'Sending the alert failed.'}
            </Text>}
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
