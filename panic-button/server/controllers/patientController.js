const {
    getAllPatients,
    getPatientByEmail,
    getPatientById,
    addPatient,
    deletePatientByEmail,
    deletePatientById,
    getPatientByEmailAndPassword } = require('../repositories/patientRepo');

async function getAllPatientsBL() {
    return await getAllPatients();
}

async function getPatientByEmailBL(email) {
    return await getPatientByEmail(email);
}

//called from the routes send to repository with the request and return the answer
async function getPatientByEmailAndPasswordBL(email, password) {
    try {
        const user = await getPatientByEmailAndPassword(email, password);
        if(user.success){
            return { success: true, user: user.patient }; // Return success and user if successful
        }
        return {success: false, massege: user.massege}
    } catch (error) {
        return { success: false, message: error.message }; // Return failure and error message
    }
}



async function getPatientByIdBL(email) {
    return await getPatientById(email);
}

async function addPatientBL(patient) {
    return await addPatient(patient);
}

async function deletePatientByIdBL(_id) {
    return await deletePatientById(_id);
}

async function deletePatientByEmailBL(email) {
    return await deletePatientByEmail(email);
}



module.exports = {
    getAllPatientsBL,
    getPatientByEmailBL,
    getPatientByIdBL,
    addPatientBL,
    deletePatientByEmailBL,
    deletePatientByIdBL,
    getPatientByEmailAndPasswordBL
};