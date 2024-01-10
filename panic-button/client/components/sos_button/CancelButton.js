import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const CancelButton = ({ navigation }) => {
    const handleCancel = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: "Home" }]
        });
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.cancelButton} onPress={() => handleCancel()}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    cancelButton: {
        width: 80,
        height: 35,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginLeft: 10,
        marginTop: 5
    },
    cancelButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default CancelButton;
