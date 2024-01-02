const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addressSchema = mongoose.Schema({
    address: {
        type: String,
        require: false
    },
    country: {
        type: String,
        require: false
    },
    city: {
        type: String,
        require: false
    },
    street: {
        type: String,
        require: false
    },
    entrance: {
        type: String,
        require: false
    },
    buildingNumber: {
        type: Number,
        require: false
    },
    floor: {
        type: Number,
        require: false
    },
    apartmentNumber: {
        type: Number,
        require: false
    },
    comments: {
        type: String,
        require: false
    }
});

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
    update:{
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
        type: addressSchema,
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