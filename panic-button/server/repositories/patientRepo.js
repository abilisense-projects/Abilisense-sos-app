const { Patient } = require('../models/patient');

async function getAllPatients() {
    try {
        const patients = await Patient.find({});
        return patients;
    } catch (error) {
        console.error('Error fetching patients:', error);
    }
}

async function getPatientByEmail(email) {
    try {
        const patient = await Patient.findOne({ email });
        console.log(patient);
        return patient;
    } catch (error) {
        console.error('Error fetching patient by email:', error);
        throw error;
    }
}

async function getPatientById(_id) {
    try {
        const patient = await Patient.findById({ _id });
        return patient;
    } catch (error) {
        console.error('Error fetching patient by _id:', error);
    }
}

async function addPatient(patient) {
    let data = {};
    try {
        data = await Patient.create(patient);
    } catch (error) {
        console.error('Error creating new patient:', error);
    }
    return data;
}

async function deletePatientByEmail(email) {
    try {
        const deletedPatient = await Patient.findOneAndDelete({ email });
        return deletedPatient;
    } catch (error) {
        console.error('Error deleting patient by email:', error);
        throw error;
    }
}

async function deletePatientById(_id) {
    try {
        const deletedPatient = await Patient.findByIdAndDelete(_id);
        return deletedPatient;
    } catch (error) {
        console.error('Error deleting patient by _id:', error);
        throw error;
    }
}


module.exports = {
    getAllPatients,
    getPatientByEmail,
    getPatientById,
    addPatient,
    deletePatientByEmail,
    deletePatientById
}