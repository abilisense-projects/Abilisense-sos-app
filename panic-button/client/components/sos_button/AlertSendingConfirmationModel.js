import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/FontAwesome'; // Assuming you have FontAwesome icons

const AlertSendingConfirmationModel = ({ visible, onSendAlert, onClose }) => {
    const { t, i18n } = useTranslation();
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Icon name="exclamation-circle" size={40} color="#E33458" />
                    <Text style={styles.modalText}>{t("Are you sure you want to send an alert?")}</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={[styles.button, { backgroundColor: "#E33458" }]} onPress={onSendAlert}>
                            <Text style={styles.buttonText}>{t("Send alert")}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, { backgroundColor: 'rgba(227, 52, 88, 0.5)' }]} onPress={onClose}>
                            <Text style={styles.buttonText}>{t("Cancel")}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        width: "90%",
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginTop: 20,
        marginBottom: 20,
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 20,
    },
    button: {
        borderRadius: 5,
        padding: 10,
        elevation: 2,
        width: '45%',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default AlertSendingConfirmationModel;
