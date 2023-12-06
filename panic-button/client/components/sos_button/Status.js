import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';

const Status = () => {
    const navigation = useNavigation();

    const handlePress = (level) => {
        navigation.navigate('ProblemType', { level: level });
    };

    return (
        <View style={styles.container}>
            <Text>Choose your status:</Text>
            <TouchableOpacity
                style={[styles.button, { backgroundColor: 'yellow' }]}
                onPress={() => handlePress('easy')}
            >
                <Text style={styles.buttonText}>Easy</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, { backgroundColor: 'orange' }]}
                onPress={() => handlePress('medium')}
            >
                <Text style={styles.buttonText}>Medium</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, { backgroundColor: '#ff0000' }]}
                onPress={() => handlePress('hard')}
            >
                <Text style={styles.buttonText}>Hard</Text>
            </TouchableOpacity>
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
