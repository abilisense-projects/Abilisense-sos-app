import React, { useState } from 'react';
import { Switch } from 'react-native-paper';
import { View, Text, StyleSheet, Alert, ImageBackground } from "react-native";
import { recordFor10Seconds } from '../services/RecordService';
import { addAlert, checkIfWordInRecord } from '../services/ApiRequest';
import { useSelector } from 'react-redux';
import AlertSendingforKeyWord from '../components/keyword/SendModal';
import SendModal from '../components/keyword/SendModal';

const SettingsPage = () => {
    const [isLocationSwitchOn, setIsLocationSwitchOn] = useState(false);
    const [isFallDetectionSwitchOn, setIsFallDetectionSwitchOn] = useState(false);
    const [isKeyWordSwitchOn, setIsKeyWordSwitchOn] = useState(false);
    const user = useSelector((state) => state.userReducer.user);
    const [modalVisible, setModalVisible] = useState(false);
    const [isAlert, setIsAlert] = useState(true);
    const timer = 20;


    // Toggle location switch
    const onLocationToggleSwitch = () => {
        setIsLocationSwitchOn(previousState => !previousState);
    }

    // Toggle fall detection switch
    const onFallDetectionToggleSwitch = () => {
        setIsFallDetectionSwitchOn(previousState => !previousState);
    }

    const openAlert = async (isKeyWordInTranscription, transcription) => {
        if (isAlert) {
            console.log("openAlert")
            if (isKeyWordInTranscription) {
                const alertRes = await addAlert(transcription, user);
                console.log('alertRes:', alertRes.data);
            }
        }

    }
    // Toggle keyword switch and perform actions if enabled
    const onKeyWordToggleSwitch = async () => {
        // Toggle keyword switch
        setIsKeyWordSwitchOn(previousState => !previousState);

        // Check if keyword switch is turned on
        if (!isKeyWordSwitchOn) {

            const recording = await recordFor10Seconds();
            console.log('record:', recording);

            //The function costs money, don't just use it.
            const response = await checkIfWordInRecord(recording);
            console.log('response:', response);
            if (response['isKeyWordInTranscription']) {
                setModalVisible(true);

                setTimeout(async () => {
                    //if not Cancel the alert
                    if (isAlert) {
                        console.log("isAlert", isAlert)
                        await openAlert(response['isKeyWordInTranscription'], response['transcription']);
                    }

                }, 20000)
            }

        }
    }

    return (
        <View style={styles.pageContainer}>
            <ImageBackground source={require('../assets/images/rm222-mind-24.jpg')} resizeMode="cover" style={styles.image}>
                <Text style={styles.titleText}>Sensors Settings</Text>
                <View style={styles.settingContainer}>
                    <Text style={styles.settingText}>Location</Text>
                    <Switch value={isLocationSwitchOn} onValueChange={onLocationToggleSwitch} color="#E33458" />
                </View>
                <View style={styles.settingContainer}>
                    <Text style={styles.settingText}>Fall Detection</Text>
                    <Switch value={isFallDetectionSwitchOn} onValueChange={onFallDetectionToggleSwitch} color="#E33458" />
                </View>
                <View style={styles.settingContainer}>
                    <Text style={styles.settingText}>Key Word</Text>
                    <Switch value={isKeyWordSwitchOn} onValueChange={onKeyWordToggleSwitch} color="#E33458" />
                </View>
                {/* <SendModal visible={modalVisible} onClose={setIsAlert(false)}/> */}
                {modalVisible&& <SendModal visible={modalVisible} onClose={(timer) => {
                    if (timer != 0) {
                        setIsAlert(false);
                    }
                    setModalVisible(false);
                }} setIsAlert={setIsAlert} openAlert={openAlert} timerNum={timer} />}
            </ImageBackground>

        </View>
    )
};

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    image: {
        flex: 1,
        // alignItems: 'center',
    },
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 40,
        textAlign: "center"
    },
    settingContainer: {
        paddingLeft: "20%",
        paddingRight: "20%",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    settingText: {
        fontSize: 16,
    },
});

export default SettingsPage;