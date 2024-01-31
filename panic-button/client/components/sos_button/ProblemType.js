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
    const problems = [t("Injury"), t("health event")];

    return (
        <View style={styles.container}>
            
            <Text>{t("Choose your problem: ")}</Text>
            {problems.map((item, index) => (
                <TouchableOpacity style={styles.button} key={index} onPress={() => handlePress(item)}>
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
    button: {
        width: 150,
        height: 150,
        backgroundColor: 'orange',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        borderRadius: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },
});

export default ProblemType;
