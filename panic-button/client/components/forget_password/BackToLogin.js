import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const BackToLoginButton = ({ navigation }) => {
    const handleNavigation = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: "Login" }]
        });
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.submitButton} onPress={() => handleNavigation()}>
                <Text style={styles.submitButtonText}>Back</Text>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    submitButton: {
        width: 80,
        height: 35,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginLeft: 10,
        marginTop: 5
    },
    submitButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default BackToLoginButton;
