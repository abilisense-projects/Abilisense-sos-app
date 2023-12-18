import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, Text, StyleSheet } from 'react-native';
import { Table, Row, TableWrapper, Cell } from 'react-native-table-component';
import { SERVER_BASE_URL } from '@env';

const ShowHistory = () => {
    const [data, setData] = useState([]);

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

    return (
        <View style={styles.container}>
            {console.log(data)}
            {data.length !== 0 ? (
                <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                    <Row
                        data={['Date', 'Location', 'Distress description', 'Level', 'Status']}
                        style={{ height: 40, backgroundColor: 'black' }}
                        textStyle={{ textAlign: 'center', fontWeight: 'bold', color: 'white' }}
                        widthArr={[100, 100, 100, 100, 100]}
                    />
                    {data.map((rowData, index) => (
                        <TableWrapper key={index} style={{ flexDirection: 'row' }}>
                            <Cell
                                data={rowData.date}
                                textStyle={{ textAlign: 'center' }}
                                width={100}
                            />
                            <Cell
                                data={rowData.location}
                                textStyle={{ textAlign: 'center' }}
                                width={100}
                            />
                            <Cell
                                data={rowData.distressDescription}
                                textStyle={{ textAlign: 'center' }}
                                width={100}
                            />
                            <Cell
                                data={rowData.level}
                                textStyle={{ textAlign: 'center' }}
                                width={100}
                            />

                            <Cell
                                data={rowData.status}
                                textStyle={{ textAlign: 'center' }}
                                width={100}
                            />
                        </TableWrapper>
                    ))}
                </Table>
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
        // alignItems: 'center',
        // justifyContent: 'center',
        padding: 16,
        paddingTop: 30
    },
});

export default ShowHistory;
