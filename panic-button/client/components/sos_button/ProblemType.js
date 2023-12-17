import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, TextInput, Text } from 'react-native';

import { useNavigation } from '@react-navigation/native';

const ProblemType = ({ onStepChange, addParamsToAlert }) => {
    const [anotherProblem, setAnotherProblem] = useState('');

    const changeText = (text) => {
        setAnotherProblem(text);

    }
    const handlePress = (problem) => {
        const prob = { problem: problem }
        addParamsToAlert(prob)
        onStepChange();
    };
    const problems = ["Injury", "health event"];

    return (
        <View style={styles.container}>
            <Text>Choose your problem: </Text>
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
