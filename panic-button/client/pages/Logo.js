import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
const Logo = () => {
    return (
        <View style={styles.container}>
            <Image
                // source={require('../assets/abilisense-logo.webp')} // החליפו את הנתיב לתמונה בהתאם
                source={require('../assets/images/AbiliSense_Lgo-sos.png')} // החליפו את הנתיב לתמונה בהתאם
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
        width: 270, // התאימו את הרוחב לצורך התמונה שלכם
        height: 40, // התאימו את הגובה לצורך התמונה שלכם
        marginBottom: 120, // הוסף את המרווח אחרי התמונה כאן
    },
});
export default Logo;