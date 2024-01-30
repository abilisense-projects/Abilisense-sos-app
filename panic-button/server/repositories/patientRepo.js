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
        return patient;
    } catch (error) {
        throw error;
    }
}

async function getPatientByEmailAndPassword(email, password) {
    try {
        // check if there is user with such email
        const patient = await Patient.findOne({ email });
        console.log('patient:', patient)
        if (!patient) {
            return { success: false, massege: 'not good email' };
        }
        //Checks whether the user found has the same password as the entered password 
        //Encrypts the received password and compares it with the encrypted password on DB 
        const isPasswordValid = await bcrypt.compare(password, patient.password);
        if (!isPasswordValid) {
            return { success: false, massege: 'not good password' };
        }
        return { success: true, patient: patient };
    } catch (error) {
        console.error('Error fetching patient by email and password:', error);
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

// add patient with hash password
const bcrypt = require('bcrypt');

async function addPatient(patient) {
    const { password, ...otherData } = patient; // Extracting password from patient object
    console.log('password', password);
    console.log('otherData', otherData);
    const hashedPassword = await bcrypt.hash(password, 10); // Hashing the password

    // Create a new object with the hashed password and other patient data
    const patientWithHashedPassword = {
        ...otherData,
        password: hashedPassword,
    };

    let data = {};
    try {
        data = await Patient.create(patientWithHashedPassword); // Inserting patient with hashed password
    } catch (error) {
        console.error('Error creating new patient:', error);
    }
    return data;
}

async function updatePassword(email, password) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10); // Hashing the password
        await Patient.updateOne({ email }, { password : hashedPassword});
    } catch (error) {
        console.error('Error update password:', error);
    }
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
    updatePassword,
    deletePatientByEmail,
    deletePatientById,
    getPatientByEmailAndPassword,
}