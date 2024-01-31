import React from "react";
import { SERVER_BASE_URL } from '@env';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import axios from 'axios';

const CancelAlertButton = ({ navigation, alertId }) => {
    const url = `${SERVER_BASE_URL}/api/alerts/update-alert/${alertId}`;

    const handleCancelAlert = async () => {
        const statusUpdate = { "status": "canceled" };
        try {
            const response = await axios.put(url, statusUpdate);
            console.log('Response from server: ', response.data);
            navigation.reset({
                index: 0,
                routes: [{ name: "Home" }]
            });

        } catch (error) {
            console.error('Error updating alert:', error);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.submitButton} onPress={() => handleCancelAlert()}>
                <Text style={styles.submitButtonText}>Cancel alert</Text>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    submitButton: {
        width: 100,
        height: 45,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginLeft: 10,
        marginTop: 5
    },
    submitButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default CancelAlertButton;