const {
    getAllMedicalConditions,
    getMedicalConditionsById,
    addMedicalConditions,
    deleteMedicalConditionsById
} = require('../repositories/medicalConditionsRepo');

async function getAllMedicalConditionsBL() {
    return await getAllMedicalConditions();
}

async function getMedicalConditionsByIddBL(email) {
    return await getMedicalConditionsById(email);
}

async function addMedicalConditionsBL( patient, medicalConditions ) {
    console.log("medicalConditions in controller:!!", medicalConditions);
    return await addMedicalConditions(patient, medicalConditions);
}

async function deleteMedicalConditionsByIdBL(_id) {
    return await deleteMedicalConditionsById(_id);
}

module.exports = {
    getAllMedicalConditionsBL,
    getMedicalConditionsByIddBL,
    addMedicalConditionsBL,
    deleteMedicalConditionsByIdBL
};