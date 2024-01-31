import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from "react-i18next";

const SideBarMenu = ({ navigation }) => {
  const [page, setPage] = useState('');
  const { t, i18n } = useTranslation();
  const pages = [t('Home'), t('History'), t('Settings'), t('Logout'), t('Accessibility')];
  const enPages = ['Home', 'History', 'Settings', 'LogOut', 'Accessibility'];
  const icons = ['home', 'history', 'settings-sharp', 'logout', 'universal-access'];
  const user = useSelector((state) => state.userReducer.user);

  //Code that gets the current page
  useFocusEffect(() => {
    const currentPage = navigation.getState().routes[navigation.getState().index].name;
    setPage(currentPage)
  }
  );


  const goToFirstScreen = (pageName) => {
    navigation.reset({
      index: 0,
      routes: [{ name: pageName }]
    });
  };

  return (
    <View style={styles.drawerContent} >
      <View style={styles.userContainer}>
        <Icon
          name="user-circle"
          size={30}
          style={styles.userIcon}
        />
        {user && <Text style={styles.userName}>{t("Hello!")} {user.fname}</Text>}
      </View>
      <Text>{"\n"}</Text>
      <View style={styles.separator} />
      <Text>{"\n"}</Text>
      {/* <Button title="Yo hablo Español" onPress={() => i18n.changeLanguage('he')} />
      <Button title="I speak English" onPress={() => i18n.changeLanguage('en')} /> */}
      {/* <View style={styles.buttonContainer}> */}
      {/* <TouchableOpacity style={styles.button} onPress={() => { i18n.language == "he" ? i18n.changeLanguage('en') : i18n.changeLanguage('he') }}>
        <Text style={styles.buttonText}>{i18n.language == "he" ? "English" : "עברית"}</Text>
      </TouchableOpacity>
      <Text>{"\n"}</Text> */}
      {/* <Text> / </Text> */}
      {/* <TouchableOpacity style={styles.button} onPress={() => i18n.changeLanguage('en')}>
          <Text style={styles.buttonText}>English</Text>
        </TouchableOpacity> */}
      {/* </View> */}



      {pages.map((item, index) => (
        <TouchableOpacity
          style={styles.drawerItem}
          key={index}
          onPress={() => { setPage(enPages[index]); goToFirstScreen(enPages[index]); }}
        >
          <View style={styles.iconTextContainer}>
            {(icons[index] == "settings-sharp") ?
              <Ionicons
                name={icons[index]}
                size={20}
                color={page === enPages[index] ? 'blue' : 'black'}
                style={styles.icon}
              /> :
              icons[index] == 'logout' ?
                <AntDesign
                  name={icons[index]}
                  size={20}
                  color={page === enPages[index] ? 'blue' : 'black'}
                  style={styles.icon}
                /> :
                <Icon
                  name={icons[index]}
                  size={20}
                  color={page === enPages[index] ? 'blue' : 'black'}
                  style={styles.icon}
                />
            }
            <Text style={page === enPages[index] ? { color: 'blue' } : { color: 'black' }}>
              {item}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
      <View style={[styles.iconTextContainer, styles.translationIcon]}>
        <MaterialCommunityIcons
          name="google-translate"
          size={20}
          color={'black'}
          style={styles.icon}
        />
        <TouchableOpacity style={styles.button} onPress={() => { i18n.language == "he" ? i18n.changeLanguage('en') : i18n.changeLanguage('he') }}>
          <Text style={styles.buttonText}>{i18n.language == "he" ? "English" : "עברית"}</Text>
        </TouchableOpacity>
      </View>
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
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {

  },
  buttonText: {
  },
});

export default SideBarMenu;
