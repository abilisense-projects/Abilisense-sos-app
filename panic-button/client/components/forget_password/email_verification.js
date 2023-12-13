// import React from 'react';
// import { View, Text, Button, TextInput } from 'react-native';


// const EmailVerification = () => {
//     const [code, onChangeCode] = React.useState('');

//     return (
//         <View>
//             <Text>Check your email inbox - a verification code has been sent now</Text>
//             <TextInput
//                 onChangeText={onChangeCode}
//                 value={code}
//             />
//             <Button title='verify password' onPress={() => console.log(pwd === verifyPwd ? "yes" : "No")}></Button>
//         </View>
//     )
// }

// export default EmailVerification;



import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const EmailVerification = () => {
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
        width: 70,
        height: 70,
        borderWidth: 2,
        textAlign: 'center',
        fontSize: 18,
    },
    inputGreenBorder: {
        borderColor: 'green',
    },
    inputMarginLeft: {
        marginLeft: 10, // Adjust the space between inputs
    }
});

export default EmailVerification;
