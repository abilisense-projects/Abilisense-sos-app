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
        <TouchableOpacity style={styles.submitButton} onPress={() => handleNavigation()}>
            <Text style={styles.submitButtonText}>Back</Text>
        </TouchableOpacity>
    )
};
const styles = StyleSheet.create({
    submitButton: {
        position: 'absolute',
        top: 10,
        left: 10,
    },
    submitButtonText: {
        fontSize: 16,
        color: "#E33458",
    },
});
export default BackToLoginButton;