// import * as React from 'react';
// import { Switch } from 'react-native-paper';
// import { View, Text, StyleSheet } from "react-native"
// import { LocationButton } from '../components/home/locationButton';

// const SettingsPage = () => {
//     const [isSwitchOn, setIsSwitchOn] = React.useState(true);

//     const onToggleSwitch = () => {
//         setIsSwitchOn(previousState => !previousState);
//         console.log("isSwitchOn", isSwitchOn);
//         // navigation.navigate('HomeScreen', {locationPressed: isSwitchOn});
//         LocationButton(isSwitchOn);
//     }

//     return (
//         <View style={styles.pageContainer}>
//             <Text>SettingsPage</Text>
//             <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
//         </View>
//     )
// };
// const styles = StyleSheet.create({
//     pageContainer: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'flex-start',
//     }
// });

// export default SettingsPage;

import * as React from 'react';
import { Switch } from 'react-native-paper';
import { View, Text, StyleSheet, ImageBackground } from "react-native"

const SettingsPage = () => {
    const [isLocationSwitchOn, setIsLocationSwitchOn] = React.useState(false);
    const [isFallDetectionSwitchOn, setIsFallDetectionSwitchOn] = React.useState(false);

    const onLocationToggleSwitch = () => {
        setIsLocationSwitchOn(previousState => !previousState);
    }
    const onFallDetectionToggleSwitch = () => {
        setIsFallDetectionSwitchOn(previousState => !previousState);
    }

    return (
        <View style={styles.pageContainer}>
            <ImageBackground source={require('../assets/images/rm222-mind-24.jpg')} resizeMode="cover" style={styles.image}>

                <Text style={styles.titleText}>Sensors Settings</Text>
                <View style={styles.settingContainer}>
                    <Text style={styles.settingText}>Location</Text>
                    <Switch value={isLocationSwitchOn} onValueChange={onLocationToggleSwitch} color="#E33458" />
                </View>
                <View style={styles.settingContainer}>
                    <Text style={styles.settingText}>Fall Detection</Text>
                    <Switch value={isFallDetectionSwitchOn} onValueChange={onFallDetectionToggleSwitch} color="#E33458" />
                </View>
                {/* Add more settings as needed */}
            </ImageBackground>
        </View>
    )
};

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    image: {
        flex: 1,
        // alignItems: 'center',
    },
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop:40,
        textAlign:"center"
    },
    settingContainer: {
        paddingLeft:"20%",
        paddingRight:"20%",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    settingText: {
        fontSize: 16,
    },
});

export default SettingsPage;

