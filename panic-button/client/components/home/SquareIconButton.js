// import React from 'react';
// import { TouchableOpacity, View, StyleSheet } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons'; // Assuming you've imported the MaterialIcons from react-native-vector-icons

// const SquareIconButton = ({ onPress, iconName }) => {
//   return (
//     <TouchableOpacity onPress={onPress}>
//       <View style={styles.button}>
//         <Icon name={iconName} size={30} color="black" />
//       </View>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   button: {
//     width: 50,
//     height: 50,
//     backgroundColor: 'lightblue',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 10,
//   },
// });

// export default SquareIconButton;

import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SquareIconButton = ({iconName, isPressed }) => {
  return (
    <TouchableOpacity>
      <View style={[styles.button, { backgroundColor: isPressed ? 'green' : 'gray' }]}>
        <Icon name={iconName} size={30} color="black" />
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
