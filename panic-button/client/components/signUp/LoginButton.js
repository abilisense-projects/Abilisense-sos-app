import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const BackButton = ({ onPress, style, textStyle }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.backButton, style]}>
      <Text style={[styles.backButtonText, textStyle]}>Back to Login</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  //not in use
  backButton: {
    padding: 10,
    borderRadius: 20,
    overflow: 'hidden',
  },
  backButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default BackButton;