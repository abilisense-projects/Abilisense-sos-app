import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import SosButton from '../components/sos_button/SosButton';
import Status from '../components/sos_button/Status';
import ProblemType from '../components/sos_button/ProblemType';
import SendAlert from '../components/sos_button/SendAlert';
import FindLocation from '../components/sos_button/FindLocation';

const HomeScreem = () => {
    const [step, setStep] = useState(1);
    const [alert, setAlert] = useState();

    const handleStepChange = () => {
        if (step == 5) {
            setStep(1);
        }
        else {
            setStep(step + 1);
        }

    };

    const addParamsToAlert = (jsonParams) => {
        setAlert({ ...alert, ...jsonParams })
    };

    useFocusEffect(
        React.useCallback(() => {
            setStep(1);
        }, [])
    );

    return (
        <>
            {step === 1 && <SosButton onStepChange={handleStepChange} />}
            {step === 2 && <Status onStepChange={handleStepChange} addParamsToAlert={addParamsToAlert} />}
            {step === 3 && <ProblemType onStepChange={handleStepChange} addParamsToAlert={addParamsToAlert} />}
            {step === 4 && <FindLocation onStepChange={handleStepChange} addParamsToAlert={addParamsToAlert} />}
            {step === 5 && <SendAlert alert={alert} onStepChange={handleStepChange} />}
        </>
    );
};

export default HomeScreem;
