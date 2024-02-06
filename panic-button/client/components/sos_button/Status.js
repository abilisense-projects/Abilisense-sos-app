import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';

const Status = ({ onStepChange, addParamsToAlert }) => {
    const { t, i18n } = useTranslation();
    const handlePress = (level) => {
        const lev = { level: level }
        addParamsToAlert(lev);
        onStepChange();
    };
    const levels = [t("Easy"), t("Medium"), t("Hard")];
    const enLevels = ["Easy", "Medium", "Hard"];
    // const levelsColors = ["#FFD700", "orange", "#FF5733"];
    const levelsColors = ["rgba(227, 52, 88, 0.5)","rgba(227, 52, 88, 0.7)","#E33458"]

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{t("Choose your level:")}</Text>
            {levels.map((item, index) => (
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: levelsColors[index] }]}
                    key={index}
                    onPress={() => handlePress(enLevels[index])}
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
        // backgroundColor: '#fff',
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
        alignItems: 'center',
        justifyContent: 'center',
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
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
});

export default Status;
