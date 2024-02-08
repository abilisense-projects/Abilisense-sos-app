import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const Logo = () => {
    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/images/AbiliSense_Lgo-sos.png')}
                style={styles.image}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 270, 
        height: 40, 
        marginBottom: 120,
    },
});

export default Logo;