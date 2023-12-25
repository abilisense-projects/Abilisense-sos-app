import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';


const ProblemType = ({ onStepChange, addParamsToAlert }) => {
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
