import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BackButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.backButton}>
      <Text style={styles.backButtonText}>Back to Login</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
  },

  backButtonText: {
    fontSize: 16,
    color: 'blue',
  },
});

export default BackButton;
