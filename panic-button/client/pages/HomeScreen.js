import React, { useState } from 'react';
import SosButton from '../components/sos_button/SosButton';
import Status from '../components/sos_button/Status';
import ProblemType from '../components/sos_button/ProblemType';
import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';
import SendAlert from '../components/sos_button/SendAlert';
import FindLocation from '../components/sos_button/FindLocation';

const Stack = createStackNavigator();

const HomeScreem = () => {
    const [step, setStep] = useState(1);
    const [alert, setAlert] = useState();
    const handleStepChange = () => {
        setStep(step + 1);
    };
    const addParamsToAlert = (jsonParams) => {
        setAlert({ ...alert, ...jsonParams })
    }
    return (
        <>
            {step === 1 && <SosButton onStepChange={handleStepChange} />}
            {step === 2 && <Status onStepChange={handleStepChange} addParamsToAlert={addParamsToAlert} />}
            {step === 3 && <ProblemType onStepChange={handleStepChange} addParamsToAlert={addParamsToAlert} />}
            {step === 4 && <FindLocation onStepChange={handleStepChange} addParamsToAlert={addParamsToAlert} />}
            {step === 5 && <SendAlert alert={alert} />}
        </>
    );
};
export default HomeScreem;