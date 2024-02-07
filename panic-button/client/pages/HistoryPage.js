import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import ShowAlerts from '../components/history/ShowAlerts';
import { SERVER_BASE_URL } from '@env';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const HistoryPage = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const [showHistory, setShowHistory] = useState(true);
  const user = useSelector((state) => state.userReducer.user);
  const [data, setData] = useState([]);

  const onShowHistory = async () => {
    setShowHistory(true);
    try {
      const patientId = user._id;
      const response = await axios.post(`${SERVER_BASE_URL}/api/alerts/get-by-patient-id/`, {
        patientId: patientId,
      });
      setData(response.data);
      setShowHistory(true)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    onShowActiveAlerts();
  }, [])

  const onShowActiveAlerts = async () => {
    setShowHistory(false);
    try {
      const patientId = user._id;
      const response = await axios.get(`${SERVER_BASE_URL}/api/alerts/get-active-alerts-by-patient-id/${patientId}`);
      setData(response.data);
      setShowHistory(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/images/rm222-mind-24.jpg')} resizeMode="cover" style={styles.image}>

        <View style={styles.alertStatusButtons}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: showHistory ? "#E33458" : 'transparent' }]}
            onPress={() => onShowHistory()}
          >
            <Text style={styles.buttonText}>{t("Show History")}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: !showHistory ? "#E33458" : 'transparent' }]}
            onPress={() => onShowActiveAlerts()}
          >
            <Text style={styles.buttonText}>{t("Show Active Alerts")}</Text>
          </TouchableOpacity>
        </View>
        <ShowAlerts data={data} showHistory={showHistory} navigation={navigation} />
        {/* {showHistory ? (
        <ShowHistory />
      ) : (
        <ShowActiveAlerts user={user} />
      )} */}
      </ImageBackground>
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    // width: windowWidth,
    // height: windowHeight,
    alignItems: 'center',
  },
  alertStatusButtons: {
    flexDirection: 'row',
    // alignItems: 'center',
    position: 'absolute',
    // textAlign:'center',
    // justifyContent:'center',
    top: 20, // Adjust this value as needed
    // left: 20, // Adjust this value as needed
  },
  button: {
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },
  buttonText: {
    fontWeight: 'bold',
  },
});

export default HistoryPage;
