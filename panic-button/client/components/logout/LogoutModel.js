import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/FontAwesome'; // Assuming you have FontAwesome icons

const LogoutAlert = ({ visible, onClose, onLogout }) => {
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
                    <Icon name="exclamation-circle" size={40} color="orange" />
                    <Text style={styles.modalText}>{t("Are you sure you want to exit?")}</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={[styles.button, { backgroundColor: 'green' }]} onPress={onLogout}>
                            <Text style={styles.buttonText}>{t("Logout")}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, { backgroundColor: 'red' }]} onPress={onClose}>
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
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: "90%",
    },
    modalText: {
        marginTop: 20,
        marginBottom: 20,
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%', // Adjusted to take full width
        marginTop: 20,
    },
    button: {
        borderRadius: 5,
        padding: 10,
        elevation: 2,
        width: '40%',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default LogoutAlert;
