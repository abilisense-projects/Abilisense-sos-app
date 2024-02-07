import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

const SendModal = ({ visible, onClose, setIsAlert, openAlert, timerNum }) => {
    const [timer, setTimer] = useState(timerNum);
    const [isClose, setIsClose] = useState(false);
    const { t, i18n } = useTranslation();

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prevTimer) => Math.max(0, prevTimer - 1));
        }, 1000);
        return () => {
            clearInterval(interval);
            if (!isClose) {
                setIsAlert(true);
            }
        };
    }, []);

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.container}>
                <View style={styles.modalView}>
                    {timer != 0 ?
                        <View>
                            <Text style={styles.timerText}>
                               Keyword alert will be sent within a few seconds.
                            </Text>
                            <View style={styles.countdownCircleTimerContainer}>
                                <CountdownCircleTimer
                                    isPlaying
                                    duration={20}
                                    colors={['#e33458', '#ed7890', '#f3a5b5', '#f9d2da']}
                                    colorsTime={[20, 15, 10, 5]}
                                >
                                    {({ remainingTime }) => <Text style={styles.text}>{remainingTime}</Text>}
                                </CountdownCircleTimer>
                            </View>
                        </View>
                        : <>
                            <Ionicons name="checkmark-circle" size={50} color="#e33458" />
                            <Text>
                                {t('Alert sent successfully!')}
                            </Text>
                        </>
                    }
                    <TouchableOpacity style={styles.cancelButton} onPress={() => { onClose(timer); setIsClose(true); }}>
                        <Text style={styles.cancelButtonText}>{timer != 0 ? "Cancel Alert" : "Close"}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    countdownCircleTimerContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        justifyContent: "center",
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    text: {
        fontSize: 50,
    },
    timerText: {
        marginBottom: 40,
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold',
        color:'grey'
    },
    cancelButton: {
        borderRadius: 5,
        padding: 10,
        elevation: 2,
        width: '40%',
        backgroundColor: "#E33458",
        width: 150,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 40
    },
    cancelButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default SendModal;
