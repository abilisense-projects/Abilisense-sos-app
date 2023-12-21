import Geolocation from '@react-native-community/geolocation';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import MapboxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';
import { ACCESS_TOKEN } from '@env';
import { useSelector } from 'react-redux';

const mapboxClient = MapboxGeocoding({ accessToken: ACCESS_TOKEN });

const FindLocation = ({ onStepChange, addParamsToAlert }) => {
    const [location, setLocation] = useState(null);
    const [address, setAddress] = useState({});
    const [defaultAddress, setDefaultAddress] = useState({});
    const [addressInput, setAddressInput] = useState('');
    const user = useSelector((state) => state.user.user);

    useEffect(() => {
        findDefaultAddress();
        findUserLocation();
    }, []);
    const findDefaultAddress = () => {
        console.log("1");
        console.log(user.address);
        setDefaultAddress(user.address);
        console.log(defaultAddress);
    }

    const findUserLocation = () => {
        Geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                setLocation({ latitude: latitude, longitude: longitude });
                getAddressFromCoordinates(latitude, longitude);
            },
            error => {
                console.log('Error:', error.message);
                // Handle error
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    };

    const handleInputChange = (address) => {
        setAddressInput(address);
    };

    const getAddressFromCoordinates = async (latitude, longitude) => {
        try {
            const response = await mapboxClient.reverseGeocode({
                query: [longitude, latitude],
                types: ['address', 'place', 'poi'],
            }).send();

            if (response && response.body && response.body.features && response.body.features.length > 0) {
                const addressData = response.body.features[0];
                // setAddress(addressData.place_name);

                const separated = addressData.place_name.split(', ');
                if (separated.length === 3) {
                    const newAddress = {
                        street: separated[0],
                        city: separated[1],
                        country: separated[2]
                    };
                    setAddress(newAddress);
                }
            } else {
                console.log('No address information was found for this location.');
            }
        } catch (error) {
            console.error('Error reading the information: ', error);
        }
    };

    const handlePress = (location) => {
        const loc = { location: location }
        console.log("loc",loc);
        addParamsToAlert(loc);
        onStepChange();
    };

    const handelInsertAdrees = () => {
        console.log(addressInput);
        const addressJson = {
            address: addressInput
        }
        console.log(addressJson);
        handlePress(addressJson);
    }

    return (
        <View style={styles.container}>
            <Text>
                {location ? 'Another address was found. Choose your address: ' : 'Your address: '}
            </Text>
            {location && (
                <View>
                    <TouchableOpacity style={styles.button} onPress={() => handlePress(address)}>
                        <Text style={styles.buttonText}>
                            {address.street}{"\n"}
                            {address.city}{"\n"}
                            {address.country}
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
            <TouchableOpacity style={styles.button} onPress={() => handlePress(defaultAddress)}>
                {defaultAddress ? <Text style={styles.buttonText}>
                    {defaultAddress.street}{"\n"}
                    {defaultAddress.city}{"\n"}
                    {defaultAddress.country}
                </Text> :
                    <Text>
                        There is no default address
                    </Text>}

            </TouchableOpacity>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter address..."
                    value={addressInput}
                    onChangeText={handleInputChange}
                />
                <TouchableOpacity style={styles.submitButton} onPress={() => handelInsertAdrees()}>
                    <Text style={styles.submitButtonText}>OK</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        height: 50,
        borderColor: 'orange',
        borderWidth: 1,
        width: 100,
        marginVertical: 10,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    submitButton: {
        width: 40,
        height: 50,
        backgroundColor: 'orange',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginLeft: 10,
    },
    submitButtonText: {
        color: 'white',
        fontSize: 16,
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
    },
    addressText: {
        fontSize: 16,
        marginBottom: 5,
    },
});

export default FindLocation;
