import React from 'react';
import { Button, View } from 'react-native';

const SosButton = () => {
    const onPress = () => {

    }
    return (
        <View>
            <Button
                onPress={onPress}
                title="S.O.S"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
            />
        </View>
    );
};

// const styles = StyleSheet.create({

// });

export default SosButton;
