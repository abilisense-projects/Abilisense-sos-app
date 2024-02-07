import React from 'react';
import axios from 'axios';
import { SERVER_BASE_URL } from '@env';
import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { sendVerificationCode } from './PublicFunctions';
const ResetPasswordInitialize = ({ onEmailChange, onStepChange }) => {
    const [message, setMessage] = React.useState('');
    const [emailInput, setEmailInput] = React.useState('');
    const checkIfEmailExists = async (email) => {
        try {
            return await axios.post(`${SERVER_BASE_URL}/api/patients/get-by-email/`, { email })
                .then(response => {
                    return response.data;
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
        catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    const handleSendingCode = async () => {
        try {
            await sendVerificationCode(emailInput);
            return true;
        } catch (error) {
            if (error.data.errorCode) {
                switch (error.data.errorCode) {
                    case "TOO_MUCH_ATTEMPTS":
                        let unblockTime = (Math.ceil((error.data.unblockTime - Date.now()) / (1000 * 60))) % 60;
                        unblockTime = unblockTime === 0 ? 5 : unblockTime;
                        setMessage(`Sorry, but you have exceeded the number of attempts allowed...\nPlease try again in ${unblockTime} minutes`);
                }
            }
            else {
                setMessage(`Unexpected error`);
                console.log(error);
            }
            return false;
        }
    }
    const handleVerificationCode = async () => {
        const result = await checkIfEmailExists(emailInput);
        if (!result) {
            setMessage('Invalid email');
        } else {
            const isSuccessfully = await handleSendingCode();
            if (!isSuccessfully) return;
            onEmailChange(emailInput);// update the email input in the parent component
            onStepChange(2);//nevigate to the next step
        }
    }
    return (
        <View style={styles.container}>
            <Text>Enter your email address:</Text>
            <TextInput
                placeholder="Your-email"
                onChangeText={setEmailInput}
                value={emailInput}
                style={styles.input}
            ></TextInput>
            <Text style={{ color: '#E33458' }}>{message}</Text>
            <TouchableOpacity style={styles.btn} onPress={handleVerificationCode} >
                <Text style={styles.buttonText} >Submit code</Text>
            </TouchableOpacity>
        </View>
    )
}
export default ResetPasswordInitialize;
const styles = StyleSheet.create({
    container: {
        width: '50%',
        height: '30%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    input: {
        width: '70%',
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    btn: {
        backgroundColor: "#E33458",
        justifyContent: 'center',
        borderRadius: 5,
        width: '70%',
        height: 50,
        marginBottom: 10,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center'
    },
});