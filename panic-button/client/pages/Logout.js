import { StyleSheet, TouchableOpacity, View, Text, ImageBackground } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import LogoutModel from "../components/logout/LogoutModel";
import { useFocusEffect } from "@react-navigation/native";

const Logout = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(true);

    const handleLogout = () => {
        setModalVisible(true);
    };

    const handleCancel = () => {
        setModalVisible(false);
        navigation.navigate('Login');
    };

    const logoutUser = async () => {
        setModalVisible(false);
        try {
            await AsyncStorage.removeItem('email');
            await AsyncStorage.removeItem('password');
            navigation.navigate('Login');
        } catch (error) {
            console.error('Error while logging out:', error);
        }

    };

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/images/rm222-mind-24.jpg')} resizeMode="cover" style={styles.image}>

                <LogoutModel
                    visible={modalVisible}
                    onClose={handleCancel}
                    onLogout={logoutUser}
                />
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // Remove backgroundColor to allow the image background to be visible
    },
    image: {
        flex: 1,
        width: '100%', // Ensure the image covers the entire width
        height: '100%', // Ensure the image covers the entire height
        justifyContent: 'center',
        alignItems: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
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
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    button: {
        borderRadius: 5,
        padding: 10,
        elevation: 2,
        marginHorizontal: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default Logout;