import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Button, View } from "react-native";

const Status = () => {
    const navigation = useNavigation();
    const [status, setStatus] = useState();
    const onPress = () => {
        navigation.navigate('ProblemType',{});
    }
    return (
        <View style={styles.container}>
            <Button
                onPress={onPress}
                title="Safe"
                color="#00ff00"
            />
            <Button
                onPress={onPress}
                title="In Danger"
                color="#ffff00"
            />
            <Button
                onPress={onPress}
                title="Emergency"
                color="#ff0000"
            />
        </View>
    )
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

});


export default Status;