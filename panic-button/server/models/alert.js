const mongoose = require('mongoose');
const alertsSchema = mongoose.Schema({
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
    date: Date,
    distressDescription: String,
    status: String,
    location:String,
    level: String
})
const Alert = new mongoose.model('alerts', alertsSchema);

module.exports = { Alert };