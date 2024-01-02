// PasswordInput.js
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PasswordInput = ({ placeholder, onPasswordChange }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        secureTextEntry={!isPasswordVisible}
        placeholder={placeholder}
        onChangeText={onPasswordChange}
      />
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => setIsPasswordVisible(!isPasswordVisible)}
      >
        <Ionicons
          name={isPasswordVisible ? 'eye-off' : 'eye'}
          size={24}
          color="black"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    paddingVertical: 8,
  },
  iconContainer: {
    padding: 8,
  },
});

export default PasswordInput;
