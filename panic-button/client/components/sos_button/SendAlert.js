import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios'; // Import המודול axios
import { SERVER_BASE_URL } from '@env';

const SendAlert = ({ alert }) => {
    const [alertSent, setAlertSent] = useState(); 
    console.log('alert: ', alert)
    useEffect(() => {
        const addAlert = async () => {
            const url = `${SERVER_BASE_URL}/api/alerts/add-alert/`;
            console.log(typeof(currentDate));
            const alertData = {
                patient: '6578581ffaed8acb3697e399',
                date: new Date(),
                distressDescription: alert.problem,
                status: 'not treated',
                location: alert.location,
                level: alert.level,   
            };
            try {
                // const response = await axios.get(`${SERVER_BASE_URL}/api/alerts/get-all/`)
                const response = await axios.post(url, alertData);
                console.log("frghtgj")
                console.log('Response from server: ', response.data);
                setAlertSent(true);

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
