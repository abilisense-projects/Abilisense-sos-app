// import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, Animated, Easing, Text } from 'react-native';

const SosButton = ({ onStepChange }) => {
    const animatedValues = useRef([
        new Animated.Value(0),
        new Animated.Value(0),
        new Animated.Value(0),
    ]).current;

    useEffect(() => {
        startAnimations();
    }, []);

    const startAnimations = () => {
        animatedValues.forEach((value, index) => {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(value, {
                        toValue: 1,
                        duration: 1000 + index * 200,
                        easing: Easing.linear,
                        useNativeDriver: true,
                    }),
                    Animated.timing(value, {
                        toValue: 0,
                        duration: 0,
                        useNativeDriver: true,
                    }),
                ]),
            ).start();
        });
    };

    const animatedCircles = animatedValues.map((value, index) => {
        const interpolateValue = value.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg'],
        });

        const animatedStyle = {
            transform: [
                {
                    translateX: value.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 0],
                    }),
                },
                {
                    translateY: value.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 0],
                    }),
                },
                {
                    scale: value.interpolate({
                        inputRange: [0, 0.3, 0.5],
                        outputRange: [1, 1.1, 1.3],
                    }),
                },
            ],
            opacity: value.interpolate({
                inputRange: [0, 0.7, 1],
                outputRange: [1, 0.3, 0],
            }),
        };

        return (
            <Animated.View key={index} style={[styles.animationCircle, animatedStyle]} />
        );
    });

    const onPress = () => {
        console.log('SosButton');
        onStepChange(2);
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={onPress}>
                <Text style={styles.buttonText}>S.O.S</Text>
                {animatedCircles}
            </TouchableOpacity>
            {/* <Button
                onPress={onPress}
                title="S.O.S"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
            /> */}
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
        borderRadius: 75,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    buttonText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
    animationCircle: {
        position: 'absolute',
        width: 140,
        height: 140,
        borderRadius: 75,
        borderWidth: 2.5,
        borderColor: 'red',
    },
});

export default SosButton;
