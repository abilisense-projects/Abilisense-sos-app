import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View, TouchableOpacity, Animated, Easing, Text } from 'react-native';

const SosButton = ({ onStepChange }) => {
    const { t, i18n } = useTranslation();
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
                { scale: value.interpolate({ inputRange: [0, 0.3, 0.5], outputRange: [1, 1.2, 1.4] }) },
            ],
            opacity: value.interpolate({ inputRange: [0, 0.7, 1], outputRange: [1, 0.3, 0] }),
        };

        return (
            <Animated.View key={index} style={[styles.animationCircle, animatedStyle]} />
        );
    });

    const onPress = () => {
        onStepChange();
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={onPress}>
                <Text style={styles.buttonText}>{t("S.O.S")}</Text>
                {animatedCircles}
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
        width: 170,  // Adjusted width
        height: 170, // Adjusted height
        borderRadius: 100, // Adjusted borderRadius
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
        width: 150, // Adjusted width
        height: 150, // Adjusted height
        borderRadius: 90, // Adjusted borderRadius
        borderWidth: 2.5,
        borderColor: 'red',
    },
});

export default SosButton;
