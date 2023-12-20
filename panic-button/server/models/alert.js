const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const alertsSchema = new Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Patient'
    },
    date: {
        type: Date,
        required: true,
    },
    distressDescription: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    level: {
        type: String,
        required: true,
    },
})
alertsSchema.index({ date: 1 })
const Alert = mongoose.model("alert", alertsSchema);
module.exports = { Alert };