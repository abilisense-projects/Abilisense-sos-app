const express = require('express');
const { getAllPatientsBL,
    getPatientByEmailBL,
    getPatientByIdBL,
    addPatientBL,
    deletePatientByEmailBL,
    deletePatientByIdBL } = require('../controllers/patientController')
const router = express.Router();

router.get('/get-all/', async (req, res) => {
    res.send(await getAllPatientsBL());
});

router.post('/get-by-email/', async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ error: 'Email parameter is required.' });
    }
    res.send(await getPatientByEmailBL(email));
});

router.post('/get-by-id/', async (req, res) => {
    const { _id } = req.body;
    if (!_id) {
        return res.status(400).json({ error: '_id parameter is required.' });
    }


    res.send(await getPatientByIdBL(_id));
});



router.post('/add-patient/', async (req, res) => {
    const { fname,
        lname,
        email,
        password,
        phone,
        dateOfBirth,
        medicalConditions,
        address } = req.body;
    //validation

    res.send(await addPatientBL({
        fname,
        lname,
        email,
        password,
        phone,
        dateOfBirth,
        medicalConditions,
        address
    }));
});

router.delete('/delete-by-id/', async (req, res) => {
    const { _id } = req.body;
    if (!_id) {
        return res.status(400).json({ error: '_id parameter is required.' });
    }


    res.send(await deletePatientByIdBL(_id));
});

router.delete('/delete-by-email/', async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ error: 'email parameter is required.' });
    }


    res.send(await deletePatientByEmailBL(email));
});


module.exports = router;