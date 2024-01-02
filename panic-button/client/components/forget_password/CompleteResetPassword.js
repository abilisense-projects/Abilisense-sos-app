import React from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { passwordValidationSchema } from '../../config/passwordValidation';
import { SERVER_BASE_URL } from '@env';
import { View, Text, Button, StyleSheet } from 'react-native';
import PasswordInput from './PasswordInput';


const CompleteResetPassword = ({ email, onStepChange }) => {
    const [password, setPassword] = React.useState('');
    const [verifyPassword, setVerifyPassword] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState('');

    const resetPassword = async (password) => {
        try {
            return await axios.post(`${SERVER_BASE_URL}/api/reset-password/complete-reset`, { email, password })
                .then(_ => {
                    return true;
                })
                .catch(error => {
                    console.error('Error:', error);
                    return false;
                });
        }
        catch (error) {
            console.error('Error complete reseting password:', error);
        }

    }
    const isValidPassword = (password) => {
        try {
            passwordValidationSchema.validateSync({ password });
            return true;
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const errorMessage = error.errors && error.errors.length > 0
                    ? error.errors[0]
                    : 'An unknown error occurred';
                setErrorMessage(errorMessage);
                return false;
            }

        }
    }
    const handleResetPassword = async () => {
        if (password != verifyPassword) {setErrorMessage("No Overlap"); return;}
        else if (isValidPassword(password)) {
            const verificationResult = await resetPassword(password);
            if (!verificationResult) return;
            onStepChange(4);//nevigate to next step
        }
    }

    return (
        <View style={styles.container}>
            <PasswordInput
                placeholder="Enter New Password"
                onPasswordChange={setPassword}
            />
            <PasswordInput
                placeholder="Re-enter Password"
                onPasswordChange={setVerifyPassword}
            />
            <Text style={{ color: 'red' }}>{errorMessage}</Text>
            <Button title='verify password' onPress={handleResetPassword}></Button>

        </View >
    )
}

export default CompleteResetPassword;

const styles = StyleSheet.create({
    container: {
        width: '50%',
        height: '50%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    input: {
        width: '70%',
        height: 40,
        borderWidth: 2,
        paddingLeft: 5,
    }
});