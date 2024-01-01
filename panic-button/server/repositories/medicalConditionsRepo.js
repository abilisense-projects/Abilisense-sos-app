const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { MedicalConditions } = require('../models/medicalConditions');

async function getAllMedicalConditions() {
    try {
        const medicalConditions = await MedicalConditions.find({});
        return medicalConditions;
    } catch (error) {
        console.error('Error fetching medicalConditions:', error);
    }
}

async function getMedicalConditionsById(_id) {
    try {
        const medicalConditions = await MedicalConditions.findById({ _id });
        return medicalConditions;
    } catch (error) {
        console.error('Error fetching medicalConditions by _id:', error);
    }
}

async function addMedicalConditions( patient, medicalConditions) {
    try {
        console.log("controller");

        if (!medicalConditions || medicalConditions.length === 0) {
            throw new Error('Medical conditions are required.');
        }

        // Hashing the medical conditions
        const hashedConditions = await Promise.all(medicalConditions.map(condition => bcrypt.hash(condition, 10)));

        const data = await MedicalConditions.create({
            patient: patient,
            medicalConditions: hashedConditions,
        });

        console.log("Medical conditions added:", data);
        return data;
    } catch (error) {
        console.error('Error creating new medical conditions:', error);
        throw error;
    }
}

async function deleteMedicalConditionsById(_id) {
    try {
        const deletedmedicalConditions = await MedicalConditions.findByIdAndDelete(_id);
        return deletedmedicalConditions;
    } catch (error) {
        console.error('Error deleting deletedmedicalConditions by _id:', error);
        throw error;
    }
}


module.exports = {
    getAllMedicalConditions,
    getMedicalConditionsById,
    addMedicalConditions,
    deleteMedicalConditionsById
}