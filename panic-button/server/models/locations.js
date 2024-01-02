const mongoose = require('mongoose');

const patientLocationSchema = mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Patient'
    },
});

const patientLocation = new mongoose.model('patient-locations', patientLocationSchema);

module.exports = { patientLocation };