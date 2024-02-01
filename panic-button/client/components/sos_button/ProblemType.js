import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { useTranslation } from 'react-i18next';

const ProblemType = ({ onStepChange, addParamsToAlert }) => {
    const { t, i18n } = useTranslation();
    const handlePress = (problem) => {
        const prob = { problem: problem }
        addParamsToAlert(prob)
        onStepChange();
    };
    const problems = [t("Injury"), t("Health Event")];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{t("Choose your problem:")}</Text>
            {problems.map((item, index) => (
                <TouchableOpacity
                    style={[styles.button]}
                    key={index}
                    onPress={() => handlePress(item)}
                >
                    <Text style={styles.buttonText}>{item}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    button: {
        width: 200,
        height: 80,
        backgroundColor: 'orange',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default ProblemType;
