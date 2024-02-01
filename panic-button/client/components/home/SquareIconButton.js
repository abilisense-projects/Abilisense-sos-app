import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
// import AntDesign from "react-native-vector-icons/AntDesign";
import Foundation from "react-native-vector-icons/Foundation";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SquareIconButton = ({ iconName, isPressed }) => {
  return (
    <TouchableOpacity>
      <View style={[styles.button, { backgroundColor: isPressed ? 'green' : '#d9d9d9' }]}>
        {iconName != "sound" && iconName != "chart-waterfall" &&<Icon name={iconName} size={30} color="black" />}
        { iconName == "sound" &&<Foundation name={iconName} size={30} color="black"/>}
        { iconName == "chart-waterfall" &&<MaterialCommunityIcons name={iconName} size={30} color="black"/>}
        {/* {iconName === "person-falling" && <FontAwesome6Icon name={iconName} size={30} color="black" />} */}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});

export default SquareIconButton;
