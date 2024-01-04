// import { View, Text } from "react-native"
// import React from 'react';


// const SettingsPage = ()=>{
//     return(
//         <View>
//             <Text>SettingsPage</Text>
//         </View>
//     )
// };
// export default SettingsPage;

import * as React from 'react';
import { Switch } from 'react-native-paper';
import { View, Text, StyleSheet } from "react-native"
import { ListenLocationButton } from '../components/home/locationButton';

const SettingsPage = () => {
    const [isSwitchOn, setIsSwitchOn] = React.useState(true);

    const onToggleSwitch = () => {
        setIsSwitchOn(previousState => !previousState);
        console.log("isSwitchOn", isSwitchOn);
        // navigation.navigate('HomeScreen', {locationPressed: isSwitchOn});
        ListenLocationButton(isSwitchOn);
    }

    return (
        <View style={styles.pageContainer}>
            <Text>SettingsPage</Text>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ marginRight: 10 }}>location: </Text>
                <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
            </View>
        </View >
    )
};
const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    }
});

export default SettingsPage;