import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const inputWidth = width * 0.12;

const CodeInput = ({ onCodeChange }) => {
    const [codes, setCodes] = useState(['', '', '', '', '', '']);
    const refs = useRef([]);

    const handleChange = (text, index, key) => {
        const newCodes = [...codes];
        newCodes[index] = text;

        setCodes(newCodes);

        // Move to the next input
        if (text.length === 1 && index < codes.length - 1) {
            refs.current[index + 1].focus();
        }

        // Move to the previous input if the current input is cleared
        if (key === 'Backspace' && text.length === 0 && index > 0) {
            refs.current[index - 1].focus();
        }

        // Send the verification code to the parent component
        onCodeChange(newCodes.join(''));
    };

    return (
        <View style={styles.container}>
            {codes.map((code, index) => (
                <TextInput
                    key={index}
                    style={[styles.input,
                    code.length === 1 && styles.inputGreenBorder,
                    index > 0 && styles.inputMarginLeft]}
                    keyboardType="numeric"
                    maxLength={1}
                    onChangeText={(text) => handleChange(text, index)}
                    onKeyPress={({ nativeEvent: { key } }) => handleChange(codes[index], index, key)}
                    ref={(input) => (refs.current[index] = input)}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    input: {
        width: inputWidth,
        height: inputWidth,
        borderWidth: 1,
        textAlign: 'center',
        fontSize: inputWidth * 0.35
    },
    inputGreenBorder: {
        borderColor: 'green',
    },
    inputMarginLeft: {
        marginLeft: inputWidth * 0.1
    }
});

export default CodeInput;
