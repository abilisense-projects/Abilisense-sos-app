const mongoose = require('mongoose');

const addressSchema = mongoose.Schema({
    country: String,
    city: String,
    street: String,
    entrance: { type: String, require: false },
    buildingNumber: Number,
    floor: Number,
    apartmentNumber: Number,
    comments: { type: String, require: false }
});

const patientsSchema = mongoose.Schema({
    fname: String,
    lname: String,
    email: { type: String, unique: true },
    password: String,
    phone: String,
    address: addressSchema,
    dateOfBirth: Date,
});

const Patient = new mongoose.model('patients', patientsSchema);

module.exports = { Patient };