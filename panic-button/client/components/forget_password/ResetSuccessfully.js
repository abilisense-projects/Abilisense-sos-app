import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';



const ResetSuccessfully = ({ navigation }) => {
    const handleNavigation = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: "Login" }]
        });
    };
    return (
        <View style={styles.container}>
            <Text>Your password has been reset successfully! {"\n"}{"\n"}
                Log In again with your new password</Text>
            <TouchableOpacity style={styles.btn} onPress={handleNavigation} >
                <Text style={styles.buttonText} >Login again</Text>
            </TouchableOpacity>
        </View>
    );
};



export default ResetSuccessfully;

const styles = StyleSheet.create({
    container: {
        width: '50%',
        height: '30%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    btn: {
        backgroundColor: "#E33458",
        justifyContent: 'center',
        borderRadius: 5,
        width: '70%',
        height: 50,
        marginBottom: 10,
        marginTop: 10
    },
    buttonText: {
        color: 'white',
        textAlign: 'center'
    }
});