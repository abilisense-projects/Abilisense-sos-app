import React from 'react';
import axios from 'axios';
import { View, Text, Button, TextInput } from 'react-native';
import { useTranslation } from 'react-i18next';

const ForgetPassword = ({ }) => {
    const [email, onChangeEmail] = React.useState('');
    const [messageToUser, onChangeMessageToUser] = React.useState('');
    const { t, i18n } = useTranslation();

    const checkIfEmailExists = async (email) => {
        try {
            return await axios.post(`http://localhost:3000/api/patients/`, { email })
                .then(response => {
                    console.log('Data:', response.data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
        catch (error) {
            console.error('Error fetching data:', error);
        }

    }

    const handleVerificationCode = async () => {
        console.log("i am in");
        const result = await checkIfEmailExists(email);
        console.log("result:", result);
        if (!result) {
            onChangeMessageToUser(t('not valid email'));
        } else {
            onChangeMessageToUser(t('succeeded!'));
            //navigation.navigate('EmailVerification');
        }
    }

    return (
        <View>
            <Text>{t("enter an email address:")}</Text>
            <TextInput
                onChangeText={onChangeEmail}
                value={email}
            />
            <Button title={t('send me verification code')} onPress={handleVerificationCode}></Button>
            <Text>{messageToUser}</Text>
        </View>
    )
}

export default ForgetPassword;