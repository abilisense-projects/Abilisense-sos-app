import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SignUpPage from './pages/SignUpPage';
import HistoryPage from './pages/HistoryPage';
import SettingsPage from './pages/SettingsPage';
import HomeScreen from './pages/HomeScreen';
import AccessibilityPage from './pages/AccessibilityPage';
import SideBarMenu from './pages/SideBarMenu';
import LogOut from './pages/Logout';
import Login from './pages/Login';
import { store, persistor } from "./redux/store";
import { Provider } from 'react-redux';
import ResetPassword from './pages/ResetPassword';
import SpeechRecognitionPage from './pages/SpeechRecognitionPage';
import { PersistGate } from 'redux-persist/integration/react';
import { Platform } from "react-native";

const isAndroid = Platform.OS === "android";
const isHermes = !!global.HermesInternal;

if (isAndroid || isHermes) {
  require("@formatjs/intl-locale/polyfill");

  require("@formatjs/intl-pluralrules/polyfill");
  require("@formatjs/intl-pluralrules/locale-data/en");
  require("@formatjs/intl-pluralrules/locale-data/he");

  require("@formatjs/intl-displaynames/polyfill");
  require("@formatjs/intl-displaynames/locale-data/en");
  require("@formatjs/intl-displaynames/locale-data/he");
}

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Could be anything that returns default preferred language
import { getLocales } from "expo-localization";

// Import all the languages you want here
import en from "./locales/en/translation.json";
import he from "./locales/he/translation.json";

i18n.use(initReactI18next).init({
  // Add any imported languages here
  resources: {
    en: {
      translation: en,
    },
    he: {
      translation: he,
    }
  },
  lng: getLocales()[0].languageCode,
  fallbackLng: "en",  // This is the default language if none of the users preffered languages are available
  interpolation: {
    escapeValue: false, // https://www.i18next.com/translation-function/interpolation#unescape
  },
  returnNull: false,
});

const Drawer = createDrawerNavigator();

const CustomHeaderTitle = () => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', right:0 }}>
      <Image
        source={require("../client/assets/images/AbiliSense_Lgo-sos.png")}
        style={{ width: 160, height: 100 }}
        resizeMode="contain"
      />
    </View>
  );
};

const App = () => {
  const [side, setSide] = useState("left")
  useEffect(() => {
    console.log("side", side);
    if (i18n.language === "he") {
      setSide('right');
    } else {
      setSide("left");
    }
  }, [i18n.language]); // Only re-run the effect if i18n.language changes
  return (

    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Drawer.Navigator drawerContent={(props) => <SideBarMenu {...props} />}
            screenOptions={{
              headerShown: true,
              headerTitle: () => <CustomHeaderTitle />,
              headerStyle: {
                backgroundColor: 'rgb(243,243,243)',
              },
            }}
            /*screenOptions={{ drawerPosition: side }}*/>
            <Drawer.Screen name="Login" component={Login} options={{
              headerShown: false
            }} />
            <Drawer.Screen name="SignUpPage" component={SignUpPage} options={{
              headerShown: false
            }} />
            <Drawer.Screen name="ResetPassword" component={ResetPassword} options={{
              headerShown: false
            }} />
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="History" component={HistoryPage} />
            <Drawer.Screen name="Settings" component={SettingsPage} />
            <Drawer.Screen name="LogOut" component={LogOut} />
            <Drawer.Screen name="Accessibility" component={AccessibilityPage}/>
            <Drawer.Screen name="ForgetPassword" component={ResetPassword} options={{ headerShown: false }} />
          </Drawer.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider >

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
