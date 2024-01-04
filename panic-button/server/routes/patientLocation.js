const express = require('express');
const {
    addLocationListBL,
    addLocationBL 
} = require('../controllers/locationController')

const router = express.Router();

router.post('/add-patient-locatoins/', async (req, res) => {
    const { patientId, locationsList } = req.body;
    res.send(addLocationListBL(patientId, locationsList))

});

router.post('/add-patient-locatoin-by-id/', async (req, res) => {
    const { patientId, location } = req.body;
    res.send(addLocationBL(patientId, location))
});

module.exports = router;