import React from 'react';
import { View, Text, Button, TextInput } from 'react-native';


const ResetPassword = () => {
    const [pwd, onChangePwd] = React.useState('');
    const [verifyPwd, onChangeVerifyPwd] = React.useState('');

    return (
        <View>
            <Text>{t("enter an email address:")}</Text>
            <TextInput
                onChangeText={onChangePwd}
                value={pwd}
            />
            <TextInput
                onChangeText={onChangeVerifyPwd}
                value={verifyPwd}
            />
            <Button title={t('verify password')} onPress={() => console.log(pwd === verifyPwd ? "yes" : "No")}></Button>
        </View>
    )
}

export default ResetPassword;