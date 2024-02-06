// import React, { useEffect, useState } from "react";
// import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import Icon from "react-native-vector-icons/FontAwesome";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import AntDesign from "react-native-vector-icons/AntDesign";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import { useSelector } from "react-redux";
// import { useFocusEffect } from '@react-navigation/native';
// import { useTranslation } from "react-i18next";

// const SideBarMenu = ({ navigation }) => {
//   const [page, setPage] = useState('');
//   const { t, i18n } = useTranslation();
//   const pages = [t('Home'), t('History'), t('Settings'), t('Logout'), t('Accessibility')];
//   const enPages = ['Home', 'History', 'Settings', 'LogOut', 'Accessibility'];
//   const icons = ['home', 'history', 'settings-sharp', 'logout', 'universal-access'];
//   const user = useSelector((state) => state.userReducer.user);

//   //Code that gets the current page
//   useFocusEffect(() => {
//     const currentPage = navigation.getState().routes[navigation.getState().index].name;
//     setPage(currentPage)
//   });

//   const goToFirstScreen = (pageName) => {
//     navigation.reset({
//       index: 0,
//       routes: [{ name: pageName }]
//     });
//   };

//   return (
//     <View style={styles.drawerContent} >
//       <View style={styles.userContainer}>
//         <Icon
//           name="user-circle"
//           size={30}
//           style={styles.userIcon}
//         />
//         {user && <Text style={styles.userName}>{t("Hello!")} {user.fname}</Text>}
//       </View>
//       <Text>{"\n"}</Text>
//       <View style={styles.separator} />
//       <Text>{"\n"}</Text>

//       {pages.map((item, index) => (
//         <TouchableOpacity
//           style={[styles.drawerItem, { backgroundColor: page === enPages[index] ? '#E33458' : 'transparent' }]}
//           key={index}
//           onPress={() => { setPage(enPages[index]); goToFirstScreen(enPages[index]); }}
//         >
//           <View style={[styles.iconTextContainer]}>
//             {(icons[index] == "settings-sharp") ?
//               <Ionicons
//                 name={icons[index]}
//                 size={20}
//                 color={page === enPages[index] ? 'white' : 'black'}
//                 style={styles.icon}
//               /> :
//               icons[index] == 'logout' ?
//                 <AntDesign
//                   name={icons[index]}
//                   size={20}
//                   color={page === enPages[index] ? 'white' : 'black'}
//                   style={styles.icon}
//                 /> :
//                 <Icon
//                   name={icons[index]}
//                   size={20}
//                   color={page === enPages[index] ? 'white' : 'black'}
//                   style={styles.icon}
//                 />
//             }
//             <Text style={page === enPages[index] ? { color: 'white' } : { color: 'black' }}>
//               {item}
//             </Text>
//           </View>
//         </TouchableOpacity>
//       ))}

//       <View style={[styles.iconTextContainer, styles.translationIcon]}>
//         <MaterialCommunityIcons
//           name="google-translate"
//           size={20}
//           color={'black'}
//           style={styles.icon}
//         />
//         <TouchableOpacity style={styles.button} onPress={() => { i18n.language == "he" ? i18n.changeLanguage('en') : i18n.changeLanguage('he') }}>
//           <Text style={styles.buttonText}>{i18n.language == "he" ? "English" : "עברית"}</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   drawerContent: {
//     flex: 1,
//     paddingTop: 50,
//     // paddingLeft: 20,
//   },
//   drawerItem: {
//     marginBottom: 20,
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     // borderRadius: 8,
//   },
//   iconTextContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   icon: {
//     marginRight: 8,
//   },
//   userContainer: {
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   userIcon: {
//     marginRight: 8,
//   },
//   userName: {
//     fontSize: 16,
//   },
//   separator: {
//     height: 1,
//     backgroundColor: 'black',
//     marginBottom: 10,
//   },
//   translationIcon: {
//     marginTop: 20,
//   },
//   button: {

//   },
//   buttonText: {
//   },
// });

// export default SideBarMenu;
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
  });

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

      {pages.map((item, index) => (
        <TouchableOpacity
          style={[styles.drawerItem]}
          key={index}
          onPress={() => { setPage(enPages[index]); goToFirstScreen(enPages[index]); }}
        >
          <View style={[styles.iconTextContainer]}>
            {(icons[index] == "settings-sharp") ?
              <Ionicons
                name={icons[index]}
                size={20}
                color={page === enPages[index] ? '#E33458' : 'black'}
                style={styles.icon}
              /> :
              icons[index] == 'logout' ?
                <AntDesign
                  name={icons[index]}
                  size={20}
                  color={page === enPages[index] ? '#E33458' : 'black'}
                  style={styles.icon}
                /> :
                <Icon
                  name={icons[index]}
                  size={20}
                  color={page === enPages[index] ? '#E33458' : 'black'}
                  style={styles.icon}
                />
            }
            <Text style={page === enPages[index] ? { color: '#E33458' } : { color: 'black' }}>
              {item}
            </Text>
          </View>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={[styles.drawerItem, styles.iconTextContainer, styles.translationIcon]}
        onPress={() => { i18n.language == "he" ? i18n.changeLanguage('en') : i18n.changeLanguage('he') }}
      >
        <MaterialCommunityIcons
          name="google-translate"
          size={20}
          color={'black'}
          style={styles.icon}
        />
        <Text style={[styles.buttonText, { color: 'black' }]}>
          {i18n.language == "he" ? "English" : "עברית"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    paddingTop: 50,
    // paddingLeft: 20,
  },
  drawerItem: {
    marginBottom: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    // borderRadius: 8,
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  userContainer: {
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
  translationIcon: {
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
  },
});

export default SideBarMenu;

