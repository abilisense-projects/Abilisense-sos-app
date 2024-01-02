import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import EmailVerification from '../components/forget_password/EmailVerification';
import ResetPasswordInitialize from '../components/forget_password/ResetPassword';
import CompleteResetPassword from '../components/forget_password/CompleteResetPassword';
import ResetSuccessfully from '../components/forget_password/ResetSuccessfully';
import BackToLoginButton from '../components/forget_password/BackToLogin';


export default function ResetPassword({ navigation }) {
    const [email, setEmail] = React.useState('');
    const [step, setStep] = useState(1);
    const handleEmailChange = (newEmail) => {
        setEmail(newEmail);
    };
    const handleStepChange = (newStep) => {
        setStep(newStep);
    };

    return (
        <View style={styles.container}>
            {
                step === 1 &&
                <>  <Text style={styles.titleText}>Password Reset</Text>
                    <ResetPasswordInitialize onEmailChange={handleEmailChange} onStepChange={handleStepChange} />
                    <BackToLoginButton navigation={navigation} />
                </>
            }
            {
                step === 2 &&
                <>  <Text style={styles.titleText}>Password Reset</Text>
                    <EmailVerification email={email} onStepChange={handleStepChange} />
                    <BackToLoginButton navigation={navigation} />
                </>
            }
            {
                step === 3 &&
                <>  <Text style={styles.titleText}>Password Reset</Text>
                    <CompleteResetPassword email={email} onStepChange={handleStepChange} />
                    <BackToLoginButton navigation={navigation} />
                </>
            }
            {
                step === 4 &&
                <>
                    <ResetSuccessfully navigation={navigation} />
                </>
            }
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
    }
});