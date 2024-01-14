import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
// import ShowHistory from '../components/history/ShowHistory';
// import ShowActiveAlerts from '../components/alerts/ShowActiveAlerts';
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
      <View style={styles.alertStatusButtons}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: showHistory ? 'lightblue' : 'white' }]}
          onPress={() => onShowHistory()}
        >
          <Text style={styles.buttonText}>{t("Show History")}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: !showHistory ? 'lightblue' : 'white' }]}
          onPress={() => onShowActiveAlerts()}
        >
          <Text style={styles.buttonText}>{t("Show Active Alerts")}</Text>
        </TouchableOpacity>
      </View>
      <ShowAlerts data={data} showHistory={showHistory} navigation={navigation}/>
      {/* {showHistory ? (
        <ShowHistory />
      ) : (
        <ShowActiveAlerts user={user} />
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertStatusButtons: {
    flexDirection: 'row',
    alignItems: 'center',
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
