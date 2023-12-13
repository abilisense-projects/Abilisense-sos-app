const { Alert } = require('../models/alert');
const { getPatientByEmail } = require('./patientRepo')

async function getAlertById(_id) {
    try {
        const alert = await Alert.findById({ _id });
        return alert;
    } catch (error) {
        console.error('Error fetching alert:', error);
    }
}

async function getAllAlerts() {
    try {
        const alerts = await Alert.find({});
        return alerts;
    } catch (error) {
        console.error('Error fetching alerts:', error);
    }
}

async function getAlertsByPatientId(patientId) {
    try {
        const alerts = await Alert.find({ patient: patientId });
        return alerts;
    } catch (error) {
        console.error('Error fetching alerts by patient id:', error);
    }
}

async function getAlertsByPatientEmail(email) {
    try {
        const patient = await getPatientByEmail(email);
        if (!patient) {
            return [];
        }
        const alerts = await getAlertsByPatientId(patient._id)
        return alerts;
    } catch (error) {
        console.error('Error fetching alerts by patient email:', error);
    }
}

async function addAlert(newAlert) {
    try {
        const alert = await Alert.create(newAlert);
        return alert;
    } catch (error) {
        console.error('Error fetching alert:', error);
    }
}

async function deleteAlertById(_id) {
    try {
        const deletedAlert = await Alert.findByIdAndDelete(_id);
        return deletedAlert;
    } catch (error) {
        console.error('Error deleting alert by _id:', error);
        throw error;
    }
}



module.exports = {
    getAlertById,
    getAllAlerts,
    getAlertsByPatientId,
    getAlertsByPatientEmail,
    addAlert,
    deleteAlertById
}