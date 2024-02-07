import React, { useState } from 'react';
import axios from 'axios';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { SERVER_BASE_URL } from '@env';
import { useTranslation } from 'react-i18next';

const ShowAlerts = ({ navigation, data, showHistory }) => {
    const [expandedRowId, setExpandedRowId] = useState(null);
    const { t, i18n } = useTranslation();

    const toggleRow = (rowId) => {
        setExpandedRowId(expandedRowId === rowId ? null : rowId);
    };

    const renderKeyValuePairs = (location) => {
        const keysWithValues = Object.entries(location).filter(([key, value]) => value !== null && value !== undefined && key !== "_id");
        return keysWithValues.map(([key, value]) => (
            <View key={key} style={styles.keyValueContainer}>
                <Text>{`${key}: ${value}`}</Text>
            </View>
        ));
    };

    const cancelAlert = async (alertId) => {
        const url = `${SERVER_BASE_URL}/api/alerts/update-alert/${alertId}`;
        const statusUpdate = { "status": "canceled" };
        try {
            const response = await axios.put(url, statusUpdate);
            console.log('Response from server: ', response.data);
            navigation.reset({
                index: 0,
                routes: [{ name: "Home" }]
            });
        } catch (error) {
            console.error('Error updating alert:', error);
        }
    };

    const renderRow = ({ item }) => (
        <TouchableOpacity style={styles.rowContainer} onPress={() => toggleRow(item._id)}>
            <Text style={styles.rowText}>
                {t("Date")}: {`${new Date(item.date).toISOString().split('T')[1].split('.')[0]}\n`}{t("Status")}: {item.status}
            </Text>
            {expandedRowId === item._id && (
                <View style={styles.expandedContent}>
                    <Text>{t("Location")}: </Text>
                    {renderKeyValuePairs(item.location)}
                    <Text>{t("Distress description")}: </Text>
                    <Text>{item.distressDescription}</Text>
                    <Text>{t("Level")}: </Text>
                    <Text>{item.level}</Text>
                    <Text>{t("Status")}: </Text>
                    <Text>{item.status}</Text>
                </View>
            )}
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {data.length !== 0 ? (
                <FlatList
                    data={data}
                    renderItem={renderRow}
                    keyExtractor={(item) => item._id}
                />
            ) : (
                <Text>{t("No alerts")}</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#fff',
        paddingTop: 30,
        textAlign: 'center',
        alignItems: 'center',
        marginTop:40
        // justifyContent:'center'
    },
    rowContainer: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#C1C0B9',
        backgroundColor: "#cccccc",
        margin: 5,
        borderRadius: 7,
    },
    rowText: {
        fontSize: 16,
        textAlign: 'center',
    },
    expandedContent: {
        marginVertical: 10,
    },
    keyValueContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    boldText: {
        fontWeight: 'bold',
    },
});

export default ShowAlerts;
