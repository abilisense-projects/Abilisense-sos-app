import React, { useState } from 'react';
import axios from 'axios';
import { View, Text, TouchableWithoutFeedback, TouchableOpacity, StyleSheet } from 'react-native';
import CodeInput from './CodeInput';
import { sendVerificationCode } from './PublicFunctions';



const EmailVerification = ({ email, onStepChange }) => {
    const [verificationCode, setVerificationCode] = useState('');
    const [message, setMessage] = React.useState('');
    const [isError, setIsError] = React.useState(false);

    const handleCodeChange = (code) => {
        setVerificationCode(code);
    };

    const verifyCode = async (email) => {
        try {
            return await axios.post(`http://localhost:3000/api/reset-password/email-verification`, { email, verificationCode })
                .then(_ => {
                    onStepChange(3);//nevigate to the next step
                })
                .catch(error => {
                    switch (error.response.data.errorCode) {
                        case "EXPIRED_CODE":
                            setMessage('The code has expired. Please resend the code');
                            break;
                        case "TOO_MUCH_ATTEMPTS":
                            let unblockTime = (Math.ceil((error.response.data.unblockTime - Date.now()) / (1000 * 60))) % 60;
                            unblockTime = unblockTime === 0 ? 5 : unblockTime;
                            setMessage(`Sorry, but you have exceeded the number of attempts allowed...\nPlease try again in ${unblockTime} minutes`);
                            break;
                        case "INVALID_CODE_ERROR":
                            setMessage('Invalid code')
                            break;
                    }
                    setIsError(true);
                });
        }
        catch (error) {
            console.error('Error verifing code:', error);
        }

    }

    const handleVerificationCode = async () => {
        try { await verifyCode(email); } catch { console.log("error"); }
    }
    const handleResend = async () => {
        try {
            await sendVerificationCode(email);
            setMessage("Verification code sent successfully");
            setIsError(false);
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
            }
            setIsError(true);
        }
    }
    return (
        <View style={styles.container}>
            <Text>Check your email inbox,
                {'\n'}
                A verification code has been sent to you right now</Text>
            <CodeInput onCodeChange={handleCodeChange}></CodeInput>
            {/* <Button title='Verify' onPress={handleVerificationCode}></Button> */}
            <TouchableOpacity style={styles.btn} onPress={handleVerificationCode} >
                <Text style={styles.buttonText} >Verify</Text>
            </TouchableOpacity>
            <TouchableWithoutFeedback onPress={handleResend}>
                <View>
                    <Text style={{ color: '#E33458', cursor: 'pointer' }}>Resend</Text>
                </View>
            </TouchableWithoutFeedback>
            <Text style={isError ? styles.errorMessage : styles.message}>{message}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '50%',
        height: '50%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
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
    errorMessage: {
        color: "red"
    },
    message: {
        color: 'green'
    }
});

export default EmailVerification;