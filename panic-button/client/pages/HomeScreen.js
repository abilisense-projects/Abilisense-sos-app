import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import SosButton from '../components/sos_button/SosButton';
import Status from '../components/sos_button/Status';
import ProblemType from '../components/sos_button/ProblemType';
import SendAlert from '../components/sos_button/SendAlert';
import FindLocation from '../components/sos_button/FindLocation';
import CancelButton from '../components/sos_button/CancelButton';
import AlertSendingConfirmationModel from '../components/sos_button/AlertSendingConfirmationModel';
import CancelAlertButton from '../components/sos_button/CancelAlertButton';
import AudioRecognition from '../components/AudioRecognition';

const HomeScreen = ({ navigation }) => {
    const [step, setStep] = useState(1);
    const [alert, setAlert] = useState();
    const [alertId, setAlertId] = useState('');
    const [modalVisible, setModalVisible] = useState(true);
    const [audio, setAudio] = useState(false);
    const [isRecording,setIsRecording] = useState(false);

    const handleCancel = () => {
        // setModalVisible(false);
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

    const AudioButtonPress = () => {
        if (audio == false) {
            setAudio(true);
        }
        else {
            setAudio(false);
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            setStep(1);
        }, [])
    );

    return (
        <>
            
            {
                step === 1 &&
                <>

                    {/* <AudioRecognition audio={audio} /> */}
                    <SosButton onStepChange={handleStepChange} />
                    {/* <TouchableOpacity style={styles.button} onPress={AudioButtonPress}>
                        <Text style={styles.buttonText}>Audio</Text>
                    </TouchableOpacity>
                    {audio && <AudioRecognition isRecording={audio}/>} */}
                </>
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
                    {/* <CancelButton navigation={navigation} /> */}
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
const styles = StyleSheet.create({
    button: {
        width: 80,
        height: 35,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginLeft: 10,
        marginTop: 5
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});


export default HomeScreen;
