import Geolocation from '@react-native-community/geolocation';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapboxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';
import { ACCESS_TOKEN } from '@env';


const mapboxClient = MapboxGeocoding({ accessToken: ACCESS_TOKEN });

const FindLocation = ({ route }) => {
    const params = route.params;
    const [location, setLocation] = useState(null);
    const [address, setAddress] = useState(null);
    const dbLocation = "dbLocation";
    const navigation = useNavigation();
    console.log('FindLocation params  ', params);
    useEffect(() => {
        findUserLocation();

    }, []);

    const findUserLocation = () => {
        Geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                setLocation({ latitude: latitude, longitude: longitude });
                // getAddressFromCoordinates(latitude, longitude);

            },
            error => {
                console.log('Error:', error.message);
                // Handle error
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    };

    const getAddressFromCoordinates = async (latitude, longitude) => {
        try {
            const response = await mapboxClient.reverseGeocode({
                query: [longitude, latitude],
                types: ['address', 'place', 'poi'],
            }).send();

            if (response && response.body && response.body.features && response.body.features.length > 0) {
                const addressData = response.body.features[0];
                console.log(addressData.place_name);
                setAddress(addressData.place_name);
            } else {
                console.log('No address information was found for this location.');
            }
        } catch (error) {
            console.error('Error reading the information: ', error);
        }
    };


    const handlePress = (location) => {
        const loc = { location: location }
        const mergedJSON = { ...params, ...loc };
        navigation.navigate('SendAlert', mergedJSON)
    };
    return (
        <View style={styles.container}>
            {location && (
                <React.Fragment>
                    <Text>
                        Another address was found. Choose your address:
                    </Text>
                    <TouchableOpacity style={styles.button} onPress={() => handlePress(location)}>
                        <Text style={styles.buttonText}>{address}</Text>
                    </TouchableOpacity>
                </React.Fragment>
            )}
            <TouchableOpacity style={styles.button} onPress={() => handlePress(dbLocation)}>
                <Text style={styles.buttonText}>{dbLocation}</Text>
            </TouchableOpacity>
        </View>
    )

};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        width: 150,
        height: 150,
        backgroundColor: 'orange',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        borderRadius: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    }
});
export default FindLocation;