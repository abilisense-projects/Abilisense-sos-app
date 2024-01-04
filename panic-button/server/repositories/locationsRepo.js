const mongoose = require('mongoose');
const { patientLocations } = require('../models/locations');
var aesEcb = require('react-native-aes-ecb');
require('dotenv').config();

async function addLocationList( patientId, locationsList) {
    try {
        const hashedLocations = await Promise.all(locationsList.map(location => aesEcb.encrypt(KEYSTRING, location)));

        const data = await patientLocations.create({
                           
            patient: patientId,
            LocationBeforeOpeningTheCall: hashedLocations,
        });

        return data;
    } catch (error) {
        console.error('Error creating new location list:', error);
        throw error;
    }
}

async function addLocation( patientId, location) {
    ///need to check by id!
    try {
        const hashedLocation = aesEcb.encrypt(KEYSTRING, location)

        const data = await patientLocations.update({
                           
            patient: patient,
            LocationAfterOpeningTheCall: [... hashedLocation],
        });

        return data;
    } catch (error) {
        console.error('Error add new location :', error);
        throw error;
    }
}

module.exports = {
    addLocationList,
    addLocation
}