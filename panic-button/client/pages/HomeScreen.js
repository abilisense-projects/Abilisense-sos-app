import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import SosButton from '../components/sos_button/SosButton';
import Status from '../components/sos_button/Status';
import ProblemType from '../components/sos_button/ProblemType';
import SendAlert from '../components/sos_button/SendAlert';
import FindLocation from '../components/sos_button/FindLocation';
import CancelButton from '../components/sos_button/CancelButton';
import AlertSendingConfirmationModel from '../components/sos_button/AlertSendingConfirmationModel';
import SquareIconButton from '../components/home/SquareIconButton';
// import { LocationButton } from '../components/home/locationButton';
import CancelAlertButton from '../components/sos_button/CancelAlertButton';


const HomeScreen = ({ navigation }) => {
    const [step, setStep] = useState(1);
    const [alert, setAlert] = useState();
    const [alertId, setAlertId] = useState('');
    const [modalVisible, setModalVisible] = useState(true);
    const [audio, setAudio] = useState(false);
    const [isRecording,setIsRecording] = useState(false);
    const [locationPressed, setlocationPressed] = useState();
    // const { locationPressed } = route.params;

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

    const handlelocationPress = () => {
        console.log('Button pressed!');
        setlocationPressed(!locationPressed);
        console.log('loc', locationPressed)
        // LocationButton(locationPressed)
        // setStep(7)
    };

    return (
        <>
            
            {
                step === 1 &&
                <View style={styles.container}>
                    <View style={styles.buttonsContainer}>
                        <SosButton onStepChange={handleStepChange} style={{ backgroundColor: 'transparent' }} />
                        <View style={styles.iconsContainer}>
                            <View style={styles.iconRow}>
                                <SquareIconButton iconName="location-on" isPressed={locationPressed} />
                                <View style={styles.iconSpacing} />
                                <SquareIconButton iconName="keyboard" />
                                <View style={styles.iconSpacing} />
                                <SquareIconButton iconName="keyboard" />
                                <View style={styles.iconSpacing} />
                                <SquareIconButton iconName="keyboard" />
                            </View>
                        </View>
                    </View>
                </View>
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
            {
                step === 7 &&
                <>
                    {/* <LocationButton/> */}
                </>
            }
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    buttonsContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 20,
    },
    iconsContainer: {
        alignItems: 'center',
        marginTop: 50
    },
    iconRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconSpacing: {
        width: 20, // Adjust spacing between icons
    },
});
export default HomeScreen;
