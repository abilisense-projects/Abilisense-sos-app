const mongoose = require('mongoose');

const medicalConditionsSchema = mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true,
    },
    medicalConditions: [{
        type: String,
    }],
});

const MedicalConditions = new mongoose.model('medicalConditions', medicalConditionsSchema);

module.exports = { MedicalConditions };
