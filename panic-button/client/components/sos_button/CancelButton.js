import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTranslation } from 'react-i18next';

const CancelButton = ({ navigation }) => {
    const { t, i18n } = useTranslation();
    
    const handleCancel = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: "Home" }]
        });
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.cancelButton} onPress={() => handleCancel()}>
                <Text style={styles.cancelButtonText}>{t("Cancel")}</Text>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        // backgroundColor: 'white',
        justifyContent: 'center',
        paddingTop: 10,  // Adjust the top padding as needed
        // marginLeft: 10,  // Adjust the left margin as needed
    },
    cancelButton: {
        width: '100%',
        height: 50,
        backgroundColor: "#E33458", // Adjust the color to match your design
        justifyContent: 'center',
        alignItems: 'center',
        // borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    cancelButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default CancelButton;
