const mongoose = require('mongoose');

const patientLocationSchema = mongoose.Schema({
    alert: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'alert',
        required: true,
    },
    LocationBeforeOpeningTheCall: [{
        type: String,
    }],
    LocationAfterOpeningTheCall: [{
        type: String,
    }],
    

});

const patientLocation = new mongoose.model('patientLocations', patientLocationSchema);

module.exports = { patientLocation };