import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';

const Status = ({ onStepChange, addParamsToAlert }) => {

    const handlePress = (level) => {
        const lev = {level: level}
        addParamsToAlert(lev);
        onStepChange();
    };
    const levels = ["Easy", "Medium", "Hard"];
    const levelsColors = ["yellow", "orange", "red"]
    return (
        <View style={styles.container}>
            <Text>Choose your level:</Text>
            {levels.map((item, index) => (
                <TouchableOpacity style={[styles.button, { backgroundColor: levelsColors[index] }]} key={index} onPress={() => handlePress(item)}>
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
