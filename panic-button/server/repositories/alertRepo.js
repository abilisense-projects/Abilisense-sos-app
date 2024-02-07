const { Alert } = require('../models/alert');
const { getPatientByEmail } = require('./patientRepo')

function getCurrentDate() {
    const moment = require('moment-timezone');

    const localTimeZone = moment.tz.guess();
    const currentTime = moment().tz(localTimeZone);

    const date = new Date();
    const utcHours = currentTime.hours();
    const utcMinutes = currentTime.minutes();
    const utcSeconds = currentTime.seconds();

    date.setUTCHours(utcHours, utcMinutes, utcSeconds);
    return date;
}

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

async function getActiveAlertsByPatientId(patientId) {
    const status = ["not treated", "in treated", "in treatment"];
    try {
        const alerts = await Alert.find({ patient: patientId, status: { $in: status } });
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
        date = getCurrentDate();
        update = date;
        newAlert.date = date;
        newAlert.update = update;
        const alert = await Alert.create(newAlert);
        return alert;
    } catch (error) {
        console.error('Error fetching alert:', error);
    }
}

async function updateAlertById(_id, updateData) {
    try {
        update = getCurrentDate();
        updateData.update = update;
        const updatedAlert = await Alert.findByIdAndUpdate(_id, updateData, { new: true });
        return updatedAlert;
    } catch (error) {
        console.error('Error updating alert by _id:', error);
        throw error;
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

// async function deleteAlertsByStatus(statusToDelete) {
//     try {
//         const deletedAlerts = await Alert.deleteOne({ status: statusToDelete });
//         return deletedAlerts;
//     } catch (error) {
//         console.error(`Error deleting alerts by status ${statusToDelete}:`, error);
//         throw error;
//     }
// }

module.exports = {
    getAlertById,
    getAllAlerts,
    getAlertsByPatientId,
    getAlertsByPatientEmail,
    addAlert,
    deleteAlertById,
    updateAlertById,
    getActiveAlertsByPatientId,
    // deleteAlertsByStatus
}