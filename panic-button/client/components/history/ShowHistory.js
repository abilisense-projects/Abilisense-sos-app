import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Table, Row, TableWrapper, Cell } from 'react-native-table-component';
import { SERVER_BASE_URL } from '@env';

const ShowHistory = () => {
    const [data, setData] = useState([]);
    const [popupVisible, setPopupVisible] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const patientId = '6578581ffaed8acb3697e399';
                const response = await axios.post(`${SERVER_BASE_URL}/api/alerts/get-by-patient-id/`, {
                    patientId: patientId,
                });
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const openPopup = (rowData) => {
        setSelectedRowData(rowData);
        setPopupVisible(true);
    };

    const closePopup = () => {
        setPopupVisible(false);
        setSelectedRowData(null);
    };

    return (
        <View style={styles.container}>
            {console.log(new Date())}
            {data.length !== 0 &&
                <Text style={[styles.title, styles.boldText]}>You can see more information by tapping on one of the table rows {"\n\n\n"}</Text>}
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
                                    data={rowData.date}
                                    textStyle={[styles.cellText, { width: 100 }]}
                                    width={100}
                                    onPress={() => openPopup(rowData)}
                                />
                                {/* <Cell
                                    data={rowData.location}
                                    textStyle={[styles.cellText, { width: 100 }]}
                                    width={100}
                                    onPress={() => openPopup(rowData)}
                                />
                                <Cell
                                    data={rowData.distressDescription}
                                    textStyle={[styles.cellText, { width: 100 }]}
                                    width={100}
                                    onPress={() => openPopup(rowData)}
                                />
                                <Cell
                                    data={rowData.level}
                                    textStyle={[styles.cellText, { width: 100 }]}
                                    width={100}
                                    onPress={() => openPopup(rowData)}
                                /> */}
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
                                        <Text style={[styles.title, styles.boldText]}>Alert information: {"\n\n"}</Text>
                                        <Text>
                                            <Text style={styles.boldText}>Date:</Text>
                                            <Text> {selectedRowData.date}</Text>
                                        </Text>
                                        <Text>
                                            <Text style={styles.boldText}>Location:</Text>
                                            <Text> {selectedRowData.location}</Text>
                                        </Text>
                                        <Text>
                                            <Text style={styles.boldText}>Distress description:</Text>
                                            <Text> {selectedRowData.distressDescription}</Text>
                                        </Text>
                                        <Text>
                                            <Text style={styles.boldText}>Level:</Text>
                                            <Text> {selectedRowData.level}</Text>
                                        </Text>
                                        <Text>
                                            <Text style={styles.boldText}>Status:</Text>
                                            <Text> {selectedRowData.status}</Text>
                                        </Text>
                                    </View>
                                ) : null}
                                <TouchableOpacity onPress={closePopup}>
                                    <Text style={styles.closeButton}>Close</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>
            ) : (
                <Text>No alerts</Text>
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
    }
});

export default ShowHistory;
