import React from 'react';
import { View, Text, Button, TextInput } from 'react-native';

const PasswordValidation = () => {
    const [pwd, onChangePwd] = React.useState('');

    return (
        <View>
            <TextInput
                onChangeText={onChangePwd}
                value={pwd}
            />

            <Text>Password must include:</Text>
            <Text>*At least one lowercase letter:</Text>
            <Text>*At least one capital letter:</Text>
            <Text>*At least one special character:</Text>
            <Text>*At least one number:</Text>
            <Text>*At least 8 characters:</Text>

            
        </View>
    )
}

export default PasswordValidation;