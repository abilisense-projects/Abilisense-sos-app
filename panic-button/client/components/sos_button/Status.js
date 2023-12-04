import React from 'react';
import { View } from "react-native";

const Status = () => {
    return (
        <View>
            <Button
                onPress={onPress}
                title="Safe"
                color="#ffffff"
                accessibilityLabel="Learn more about this purple button"
            />
            <Button
                onPress={onPress}
                title="In Danger"
                color="#ffff00"
                accessibilityLabel="Learn more about this purple button"
            />
            <Button
                onPress={onPress}
                title="Emergency"
                color="#ff0000"
                accessibilityLabel="Learn more about this purple button"
            />
        </View>
    )
};

export default Status;