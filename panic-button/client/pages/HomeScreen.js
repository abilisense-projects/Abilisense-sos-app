// Import necessary modules and components
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, ImageBackground } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import SosButton from '../components/sos_button/SosButton';
import Status from '../components/sos_button/Status';
import ProblemType from '../components/sos_button/ProblemType';
import SendAlert from '../components/sos_button/SendAlert';
import FindLocation from '../components/sos_button/FindLocation';
import CancelButton from '../components/sos_button/CancelButton';
import AlertSendingConfirmationModel from '../components/sos_button/AlertSendingConfirmationModel';
import SquareIconButton from '../components/home/SquareIconButton';
import { LocationButton } from '../components/home/locationButton';
import CancelAlertButton from '../components/sos_button/CancelAlertButton';
import AudioRecognition from '../components/AudioRecognition';

// Main HomeScreen component
const HomeScreen = ({ navigation }) => {
    // State variables
    const [step, setStep] = useState(1);
    const [alert, setAlert] = useState();
    const [alertId, setAlertId] = useState('');
    const [modalVisible, setModalVisible] = useState(true);
    const [audio, setAudio] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [locationPressed, setlocationPressed] = useState();
    const image = { uri: 'https://legacy.reactjs.org/logo-og.png' };

    // Function to handle cancellation
    const handleCancel = () => {
        setStep(1);
    };

    // Function to handle sending an alert
    const onSendAlert = () => {
        handleStepChange();
    };

    // Function to handle step changes
    const handleStepChange = () => {
        if (step === 6) {
            setStep(1);
        } else {
            setStep(step + 1);
        }
    };

    // Function to add parameters to the alert
    const addParamsToAlert = (jsonParams) => {
        setAlert({ ...alert, ...jsonParams });
    };

    // Function to handle audio button press
    const AudioButtonPress = () => {
        setAudio(!audio);
    };

    // Use focus effect to reset step on screen focus
    useFocusEffect(
        React.useCallback(() => {
            setStep(1);
        }, [])
    );

    // Function to handle location button press
    const handlelocationPress = () => {
        setlocationPressed(!locationPressed);
        LocationButton(locationPressed);
    };

    // Return JSX based on the current step
    return (
        <>
            <View style={styles.container}>
                <ImageBackground source={require('../assets/images/rm222-mind-24.jpg')} resizeMode="cover" style={styles.image}>

                    {step === 1 && (
                        <View style={styles.buttonsContainer}>
                            <SosButton onStepChange={handleStepChange} style={{ backgroundColor: 'transparent' }} />
                            <View style={styles.iconsContainer}>
                                <View style={styles.iconRow}>
                                    <SquareIconButton iconName="location-on" isPressed={locationPressed} />
                                    <View style={styles.iconSpacing} />
                                    <SquareIconButton iconName="chart-waterfall" />
                                    <View style={styles.iconSpacing} />
                                    <SquareIconButton iconName="sound" />
                                    <View style={styles.iconSpacing} />
                                    <SquareIconButton iconName="keyboard" />
                                </View>
                            </View>
                        </View>

                    )}
                    {step === 2 && (
                        <>
                            <Status onStepChange={handleStepChange} addParamsToAlert={addParamsToAlert} />
                            <CancelButton navigation={navigation} style={styles.button} />
                        </>
                    )}
                    {step === 3 && (
                        <>
                            <ProblemType onStepChange={handleStepChange} addParamsToAlert={addParamsToAlert} />
                            <CancelButton navigation={navigation} />
                        </>
                    )}
                    {step === 4 && (
                        <>
                            <FindLocation onStepChange={handleStepChange} addParamsToAlert={addParamsToAlert} />
                            <CancelButton navigation={navigation} />
                        </>
                    )}
                    {step === 5 && (
                        <>
                            <AlertSendingConfirmationModel
                                visible={modalVisible}
                                onClose={handleCancel}
                                onSendAlert={onSendAlert}
                            />
                        </>
                    )}
                    {step === 6 && (
                        <>
                            <SendAlert alert={alert} onStepChange={handleStepChange} setAlertId={setAlertId} />
                            <CancelAlertButton navigation={navigation} alertId={alertId} />
                        </>
                    )}
                    {step === 7 && (
                        <>
                            <LocationButton />
                        </>
                    )}
                </ImageBackground>
            </View>
        </>
    );
};

// Styles for the components
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: 'white',
    },
    buttonsContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 20,
    },
    iconsContainer: {
        alignItems: 'center',
        marginTop: 80,
    },
    iconRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconSpacing: {
        width: 20, // Adjust spacing between icons
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },

});

// Export the HomeScreen component
export default HomeScreen;
