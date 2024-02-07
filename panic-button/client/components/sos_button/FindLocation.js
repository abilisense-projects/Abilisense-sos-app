import Geolocation from '@react-native-community/geolocation';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import MapboxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';
import { ACCESS_TOKEN } from '@env';
import { useSelector } from 'react-redux';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';

const mapboxClient = MapboxGeocoding({ accessToken: ACCESS_TOKEN });

const FindLocation = ({ onStepChange, addParamsToAlert }) => {
    const [location, setLocation] = useState(null);
    const [address, setAddress] = useState({});
    const [defaultAddress, setDefaultAddress] = useState({});
    const [addressInput, setAddressInput] = useState('');
    const user = useSelector((state) => state.userReducer.user);

    useEffect(() => {
        findDefaultAddress();
        findUserLocation();
    }, []);

    const findDefaultAddress = () => {
        setDefaultAddress(user.address);
    };

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

                const separatedAddress = addressData.place_name.split(', ');
                if (separatedAddress.length === 3) {
                    const newAddress = {
                        street: separatedAddress[0],
                        city: separatedAddress[1],
                        country: separatedAddress[2]
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
        addParamsToAlert(loc);
        onStepChange();
    };

    const handelInsertAdrees = () => {
        const addressJson = {
            address: addressInput
        }
        handlePress(addressJson);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {location ? t('Another address was found. Choose your address: ') : t('Your address: ')}
            </Text>
            {location && (
                <TouchableOpacity style={styles.button} onPress={() => handlePress(address)}>
                    <Text style={styles.buttonText}>
                        {address.street}{"\n"}
                        {address.city}{"\n"}
                        {address.country}
                    </Text>
                </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.button} onPress={() => handlePress(defaultAddress)}>
                {defaultAddress ? <Text style={styles.buttonText}>
                    {defaultAddress.street} {defaultAddress.buildingNumber}{"\n"}
                    {defaultAddress.city}{"\n"}
                    {defaultAddress.country}
                </Text> :
                    <Text>
                        {t("There is no default address")}
                    </Text>}
            </TouchableOpacity>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder={t("Enter address...")}
                    value={addressInput}
                    onChangeText={handleInputChange}
                />
                <TouchableOpacity style={styles.submitButton} onPress={() => handelInsertAdrees()}>
                    <Text style={styles.submitButtonText}>{t("OK")}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        width:230,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        height: 50,
        borderColor: "#E33458",
        borderWidth: 1,
        width: 160,
        marginVertical: 10,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    submitButton: {
        width: 60,
        height: 50,
        backgroundColor: "#E33458",
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
        width: 230,
        height: 80,
        backgroundColor: "#E33458",
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },
});

export default FindLocation;
