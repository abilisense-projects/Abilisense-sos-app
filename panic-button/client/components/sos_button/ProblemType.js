import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, TextInput, Text } from 'react-native';

import { useNavigation } from '@react-navigation/native';

const ProblemType = ({ route }) => {
    const navigation = useNavigation();
    const level = route.params;
    const [text, setText] = useState('');
    

    const send = (problem) => {
        const prob = {problem: problem}
        const paramsToSend = JSON.stringify({ ...level, ...prob })
        console.log(paramsToSend);
        navigation.navigate('SendAlert', paramsToSend)
    };
    

    return (
        <View style={styles.container}>
            <Text>Choose your problem: </Text>
            <TouchableOpacity style={styles.button} onPress={()=>{send("problem 1")}}>
                <Text style={styles.buttonText}>Problem 1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={()=>{send("problem 2")}}>
                <Text style={styles.buttonText}>Problem 2</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={()=>{send("problem 3")}}>
                <Text style={styles.buttonText}>Problem 3</Text>
            </TouchableOpacity>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Another problem"
                    onChangeText={newText => setText(newText)}
                    value={text}
                />
                <TouchableOpacity style={styles.submitButton} onPress={()=>{send(text)}}>
                    <Text style={styles.submitButtonText}>OK</Text>
                </TouchableOpacity>
            </View>
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
        width: 200,
        height: 50,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        borderRadius: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
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
