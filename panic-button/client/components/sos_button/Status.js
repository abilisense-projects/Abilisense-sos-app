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
    const levelsColors = ["yellow", "orange", "red"]
    return (
        <View style={styles.container}>
            <Text>{t("Choose your level:")}</Text>
            {levels.map((item, index) => (
                <TouchableOpacity style={[styles.button, { backgroundColor: levelsColors[index] }]} key={index} onPress={() => handlePress(enLevels[index])}>
                    <Text>{item}</Text>
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
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        borderRadius: 15,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
});

export default Status;
