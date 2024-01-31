import React, { useState } from 'react';
import axios from 'axios';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Table, Row, TableWrapper, Cell } from 'react-native-table-component';
import { SERVER_BASE_URL } from '@env';
import { useTranslation } from 'react-i18next';



const ShowAlerts = ({ navigation, data, showHistory }) => {
    const [popupVisible, setPopupVisible] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState(null);
    const { t, i18n } = useTranslation();

    const openPopup = (rowData) => {
        setSelectedRowData(rowData);
        setPopupVisible(true);
    };

    const closePopup = () => {
        setPopupVisible(false);
        if (!selectedRowData) {
            setSelectedRowData(null);
        }
    };

    const cancelAlert = async (alertId) => {
        const url = `${SERVER_BASE_URL}/api/alerts/update-alert/${alertId}`;
        const statusUpdate = { "status": "canceled" };
        try {
            const response = await axios.put(url, statusUpdate);
            console.log('Response from server: ', response.data);
            closePopup();
            navigation.reset({
                index: 0,
                routes: [{ name: "Home" }]
            });

        } catch (error) {
            console.error('Error updating alert:', error);
        }
    };

    const renderKeyValuePairs = (data) => {
        const keysWithValues = Object.entries(data).filter(([key, value]) => value !== null && value !== undefined && key != "_id");
        return keysWithValues.map(([key, value]) => (
            <View key={key} style={styles.keyValueContainer}>
                <Text /*style={styles.boldText}*/>{key}: </Text>
                <Text>{value}</Text>
            </View>
        ));
    };

    return (
        <View style={styles.container}>
            {data.length !== 0 &&
                <Text style={[styles.title, styles.boldText]}>{t("You can see more information by tapping on one of the table rows")} {"\n\n\n"}</Text>}
            {data.length !== 0 ? (
                <View>
                    <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                        <Row
                            // data={['Date', 'Location', 'Distress description', 'Level', 'Status']}
                            data={['Date', 'Status']}
                            style={{ height: 40, backgroundColor: 'black' }}
                            textStyle={{ textAlign: 'center', fontWeight: 'bold', color: 'white' }}
                            // widthArr={[100, 100, 100, 100, 100]}
                            widthArr={[100, 100]}
                        />
                        {data.map((rowData, index) => (
                            <TableWrapper key={index} style={{ flexDirection: 'row' }}>
                                <Cell
                                    data={`${new Date(rowData.date).toISOString().split('T')[1].split('.')[0]}${"\n"}${new Date(rowData.date).toISOString().split('T')[0]}`}
                                    textStyle={[styles.cellText, { width: 100 }]}
                                    width={100}
                                    onPress={() => openPopup(rowData)}
                                />
                                <Cell
                                    data={rowData.status}
                                    textStyle={[styles.cellText, { width: 100 }]}
                                    width={100}
                                    onPress={() => openPopup(rowData)}
                                />
                            </TableWrapper>
                        ))}
                    </Table>

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={popupVisible}
                        onRequestClose={closePopup}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                {selectedRowData ? (
                                    <View>
                                        <Text style={[styles.title, styles.boldText]}>{t("Alert information:")} {"\n\n"}</Text>
                                        <Text>
                                            <Text style={styles.boldText}>{t("Date:")}</Text>
                                            <Text>{` ${new Date(selectedRowData.date).toISOString().split('T')[1].split('.')[0]}  ${new Date(selectedRowData.date).toISOString().split('T')[0]}`}</Text>
                                        </Text>
                                        {/* <Text> */}
                                        <Text style={styles.boldText}>{t("Location:")}</Text>
                                        {renderKeyValuePairs(selectedRowData.location)}
                                        {/* <Text> {selectedRowData.location}</Text> */}
                                        {/* </Text> */}
                                        <Text>
                                            <Text style={styles.boldText}>{t("Distress description:")}</Text>
                                            <Text> {selectedRowData.distressDescription}</Text>
                                        </Text>
                                        <Text>
                                            <Text style={styles.boldText}>{t("Level:")}</Text>
                                            <Text> {selectedRowData.level}</Text>
                                        </Text>
                                        <Text>
                                            <Text style={styles.boldText}>{t("Status:")}</Text>
                                            <Text> {selectedRowData.status}</Text>
                                        </Text>
                                    </View>
                                ) : null}
                                <View style={styles.buttonContainer}>
                                    {!showHistory && <TouchableOpacity onPress={() => cancelAlert(selectedRowData._id)}>
                                        <Text style={styles.cancelButton}>{t("Cancel alert")}</Text>
                                    </TouchableOpacity>}
                                    <TouchableOpacity onPress={closePopup}>
                                        <Text style={styles.closeButton}>{t("Close")}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            ) : (
                <Text>{t("No alerts")}</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
        paddingTop: 30,
        textAlign: 'center',
        alignItems: 'center'
    },
    title: {
        textAlign: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    cellText: {
        textAlign: 'center',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        numberOfLines: 1,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    cancelButton: {
        marginTop: 20,
        color: 'red',
        fontWeight: 'bold',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    closeButton: {
        marginTop: 20,
        color: 'blue',
        fontWeight: 'bold',
    },
    boldText: {
        fontWeight: 'bold',
    },
    keyValueContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
});

export default ShowAlerts;
