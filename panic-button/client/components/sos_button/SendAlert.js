import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import { SERVER_BASE_URL } from '@env';

const SendAlert = ({ onStepChange, alert }) => {
    const [alertSent, setAlertSent] = useState();

    useEffect(() => {
        const addAlert = async () => {
            const url = `${SERVER_BASE_URL}/api/alerts/add-alert/`;

            const alertData = {
                patient: '6578581ffaed8acb3697e399',
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
                setTimeout(() => {
                    onStepChange();
                }, 5000);

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
