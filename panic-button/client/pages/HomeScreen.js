import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import SosButton from '../components/sos_button/SosButton';
import Status from '../components/sos_button/Status';
import ProblemType from '../components/sos_button/ProblemType';
import SendAlert from '../components/sos_button/SendAlert';
import FindLocation from '../components/sos_button/FindLocation';
import CancelButton from '../components/sos_button/CancelButton';
import AlertSendingConfirmationModel from '../components/sos_button/AlertSendingConfirmationModel';
import CancelAlertButton from '../components/sos_button/CancelAlertButton';

const HomeScreen = ({ navigation }) => {
    const [step, setStep] = useState(1);
    const [alert, setAlert] = useState();
    const [alertId, setAlertId] = useState('');
    const [modalVisible, setModalVisible] = useState(true);

    const handleCancel = () => {
        setModalVisible(false);
        setStep(1);

    };

    const onSendAlert = () => {
        handleStepChange()
    }

    const handleStepChange = () => {
        if (step == 6) {
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
            {
                step === 1 &&
                <SosButton onStepChange={handleStepChange} />
            }
            {
                step === 2 &&
                <>
                    <CancelButton navigation={navigation} />
                    <Status onStepChange={handleStepChange} addParamsToAlert={addParamsToAlert} />
                </>
            }
            {
                step === 3 &&
                <>
                    <CancelButton navigation={navigation} />
                    <ProblemType onStepChange={handleStepChange} addParamsToAlert={addParamsToAlert} />
                </>
            }
            {
                step === 4 &&
                <>
                    <CancelButton navigation={navigation} />
                    <FindLocation onStepChange={handleStepChange} addParamsToAlert={addParamsToAlert} />
                </>
            }
            {
                step === 5 &&
                <>
                    <CancelButton navigation={navigation} />
                    <AlertSendingConfirmationModel
                        visible={modalVisible}
                        onClose={handleCancel}
                        onSendAlert={onSendAlert} />
                </>
            }
            {
                step === 6 &&
                <>
                    {/* <CancelButton navigation={navigation}/> */}
                    <CancelAlertButton navigation={navigation} alertId={alertId} />
                    <SendAlert alert={alert} onStepChange={handleStepChange} setAlertId={setAlertId} />
                </>
            }
        </>
    );
};

export default HomeScreen;
