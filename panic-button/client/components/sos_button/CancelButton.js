import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const CancelButton = ({ navigation }) => {
    console.log(navigation);
    const handleCancel = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: "Home" }]
        });
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.submitButton} onPress={() => handleCancel()}>
                <Text style={styles.submitButtonText}>Cancel</Text>
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

export default CancelButton;
