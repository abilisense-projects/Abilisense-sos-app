// import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Button, View } from 'react-native';

const SosButton = ({ navigation }) => {
    console.log("111111111")
    // const navigation = useNavigation();
    const onPress = () => {
        console.log('SosButton');
        navigation.navigate('Status');
    }
    return (
        <View style={styles.container}>
            <Button
                onPress={onPress}
                title="S.O.S"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
            />
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
  });

export default SosButton;
