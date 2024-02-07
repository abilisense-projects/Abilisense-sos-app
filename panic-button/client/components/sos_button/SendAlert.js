import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Expo for icons
import axios from 'axios';
import { SERVER_BASE_URL } from '@env';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const SendAlert = ({ onStepChange, alert, setAlertId }) => {
    const { t, i18n } = useTranslation();
    const [alertSent, setAlertSent] = useState(null);
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

            try {
                const response = await axios.post(url, alertData);
                setAlertSent(true);
                setAlertId(response.data._id);

            } catch (error) {
                console.error('Error sending data to the server:', error);
                setAlertSent(false);
            }
        };

        addAlert();
    }, []);

    return (
        <View style={styles.container}>
            {alertSent !== null && (
                <View style={styles.statusContainer}>
                    {alertSent ? (
                        <>
                            <Ionicons name="checkmark-circle" size={50} color="green" />
                            <Text style={styles.successText}>
                                {t('Alert sent successfully!')}
                            </Text>
                        </>
                    ) : (
                        <>
                            <Ionicons name="alert-circle" size={50} color="red" />
                            <Text style={styles.errorText}>
                                {t('Sending the alert failed.')}
                            </Text>
                        </>
                    )}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    statusContainer: {
        alignItems: 'center',
    },
    successText: {
        color: 'green',
        marginTop: 10,
    },
    errorText: {
        color: 'red',
        marginTop: 10,
    },
});

export default SendAlert;
