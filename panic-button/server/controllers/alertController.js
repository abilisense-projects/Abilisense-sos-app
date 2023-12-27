const { getAlertById,
    getAllAlerts,
    getAlertsByPatientId,
    getAlertsByPatientEmail,
    addAlert,
    deleteAlertById,
    deleteAlertsByStatus,
    updateAlertById, 
    getActiveAlertsByPatientId} = require('../repositories/alertRepo');

async function getAllAlertsBL() {
    return await getAllAlerts();
}

async function getAlertsByPatientIdBL(patientId) {
    return await getAlertsByPatientId(patientId);
}

async function getActiveAlertsByPatientIdBL(patientId){
    return await getActiveAlertsByPatientId(patientId);
}

async function getAlertsByPatientEmailBL(email) {
    return await getAlertsByPatientEmail(email);
}

async function getAlertByIdBL(_id) {
    return await getAlertById(_id);
}

async function addAlertBL(alert) {
    return await addAlert(alert);
}

async function updateAlertByIdBL(_id, updateData) {
    return await updateAlertById(_id, updateData);
}

async function deleteAlertByIdBL(_id) {
    return await deleteAlertById(_id);
}

// async function deleteAlertsByStatusBL(statusToDelete){
//     return await deleteAlertsByStatus(statusToDelete);
// }




module.exports = {
    getAllAlertsBL,
    getAlertsByPatientIdBL,
    getAlertsByPatientEmailBL,
    getAlertByIdBL,
    addAlertBL,
    deleteAlertByIdBL,
    updateAlertByIdBL,
    getActiveAlertsByPatientIdBL,
    // deleteAlertsByStatusBL,
};