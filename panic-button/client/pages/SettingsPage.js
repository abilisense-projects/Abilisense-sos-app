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

import React, { useState, useEffect } from 'react';
import { Switch } from 'react-native-paper';
import { View, Text, StyleSheet } from "react-native"
import { ListenLocationButton } from '../components/home/locationButton';


const SettingsPage = () => {
    const [status, setStatus] = useState();

    useEffect(() => {
        // פונקציה שתתבצע כל פעם שהסטטוס משתנה
        ListenLocationButton(status);
    }, [status]); // הפעלה רק כאשר הסטטוס משתנה

    const toggleStatus = () => {
        console.log("status", status)
        setStatus(prevStatus => !prevStatus);
        console.log("status", status)
        handlelocationPress(status)
    };

// const [isSwitchOn, setIsSwitchOn] = useState(true);


// const onToggleSwitch = () => {
//     ListenLocationButton(!isSwitchOn);
//     setIsSwitchOn(!isSwitchOn);
//     console.log("isSwitchOn", isSwitchOn);
//     // navigation.navigate('HomeScreen', {locationPressed: isSwitchOn});
// }

return (
    <View style={styles.pageContainer}>
        <Text>SettingsPage</Text>
        <View style={{ flexDirection: 'row' }}>
            <Text style={{ marginRight: 10 }}>location: </Text>
            <Switch value={!status} onValueChange={toggleStatus} />
        </View>
    </View>
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