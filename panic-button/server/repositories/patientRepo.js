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

// async function getPatientByEmailAndPassword(email, password) {
//     try {
//         const patient = await Patient.findOne({ email });
//         const isPasswordValid = await bcrypt.compare(password, patient.password);
//         if (!isPasswordValid) {
//             throw new AuthenticationError('Auto faild');
//         }
//         return patient;
//     } catch (error) {
//         console.error('Error fetching patient by email and password:', error);
//         throw error;
//     }
// }
async function getPatientByEmailAndPassword(email, password) {
    try {
        const success = false;
        const patient = await Patient.findOne({ email });
        console.log('patient:', patient)
        if (!patient) {
            console.log('no patient')
            return { success: false, massege: 'not good email' };
        }

        const isPasswordValid = await bcrypt.compare(password, patient.password);
        if (!isPasswordValid) {
            console.log('not good password')
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
    deletePatientById,
    getPatientByEmailAndPassword
}