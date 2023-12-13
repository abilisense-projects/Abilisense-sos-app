import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, TextInput, Text } from 'react-native';

import { useNavigation } from '@react-navigation/native';

const ProblemType = ({ route }) => {
    const navigation = useNavigation();
    const level = route.params;
    const [anotherProblem, setAnotherProblem] = useState('');

    const changeText = (text) => {
        setAnotherProblem(text);
        
    }
    const handlePress = (problem) => {
        const prob = { problem: problem }
        const mergedJSON = { ...level, ...prob }
        navigation.navigate('FindLocation', mergedJSON)
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
            {/* <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Another problem"
                    onChangeText={newText => changeText(newText)}
                    value={anotherProblem}
                />
                <TouchableOpacity style={styles.submitButton} onPress={() => { handlePress(anotherProblem) }}>
                    <Text style={styles.submitButtonText}>OK</Text>
                </TouchableOpacity>
            </View> */}
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
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        height: 50,
        borderColor: 'blue',
        borderWidth: 1,
        width: 140,
        marginVertical: 10,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    submitButton: {
        width: 50,
        height: 50,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginLeft: 10,
    },
    submitButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default ProblemType;
