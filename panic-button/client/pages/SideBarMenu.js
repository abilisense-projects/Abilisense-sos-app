import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useSelector } from "react-redux";

const SideBarMenu = ({ navigation }) => {
  const [page, setPage] = useState('');
  const pages = ['Home', 'History', 'Settings', 'LogOut', 'Accessibility'];
  const icons = ['home', 'history', 'settings-sharp', 'logout', 'universal-access'];
  const user = useSelector((state) => state.user.user);
  console.log(user);

  return (
    <View style={styles.drawerContent}>
      <View style={styles.userContainer}>
        <Icon
          name="user-circle"
          size={30}
          style={styles.userIcon}
        />
        {user && <Text style={styles.userName}>{user.fname}</Text>}
      </View>
      <Text>{"\n"}</Text>
      <View style={styles.separator} />
      <Text>{"\n\n"}</Text>
      {pages.map((item, index) => (
        <TouchableOpacity
          style={styles.drawerItem}
          key={index}
          onPress={() => { setPage(item); navigation.navigate(item) }}
        >
          <View style={styles.iconTextContainer}>
            {(icons[index] == "settings-sharp") ?
              <Ionicons
                name={icons[index]}
                size={20}
                color={page === item ? 'blue' : 'black'}
                style={styles.icon}
              /> :
              icons[index] == 'logout' ?
                <AntDesign
                  name={icons[index]}
                  size={20}
                  color={page === item ? 'blue' : 'black'}
                  style={styles.icon}
                /> :
                <Icon
                  name={icons[index]}
                  size={20}
                  color={page === item ? 'blue' : 'black'}
                  style={styles.icon}
                />
            }
            <Text style={page === item ? { color: 'blue' } : { color: 'black' }}>
              {item}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    paddingTop: 50,
    paddingLeft: 20,
  },
  drawerItem: {
    marginBottom: 20,
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  userContainer: {
    // flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  userIcon: {
    marginRight: 8,
  },
  userName: {
    fontSize: 16,
  },
  separator: {
    height: 1,
    backgroundColor: 'black',
    marginBottom: 10,
  },
});

export default SideBarMenu;
