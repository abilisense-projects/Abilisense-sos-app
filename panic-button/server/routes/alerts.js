const express = require('express');
const {
    getAllAlertsBL,
    getAlertsByPatientIdBL,
    getAlertsByPatientEmailBL,
    getAlertByIdBL,
    addAlertBL,
    deleteAlertByIdBL
} = require('../controllers/alertController')
const router = express.Router();

router.get('/get-all/', async (req, res) => {
    res.send(await getAllAlertsBL());
});


router.post('/get-by-patient-email/', async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ error: 'Email parameter is required.' });
    }


    res.send(await getAlertsByPatientEmailBL(email));
});

router.post('/get-by-patient-id/', async (req, res) => {
    const { patientId } = req.body;
    if (!patientId) {
        return res.status(400).json({ error: 'patientId parameter is required.' });
    }


    res.send(await getAlertsByPatientIdBL(patientId));
});


router.post('/get-by-id/', async (req, res) => {
    const { _id } = req.body;
    if (!_id) {
        return res.status(400).json({ error: '_id parameter is required.' });
    }


    res.send(await getAlertByIdBL(_id));
});


router.post('/add-alert/', async (req, res) => {
    const { patient, distressDescription, level, date, location, status } = req.body;
    //validation

    res.send(await addAlertBL({ patient, distressDescription, level, date, location, status }));
});

router.delete('/delete-by-id/', async (req, res) => {
    const { _id } = req.body;
    if (!_id) {
        return res.status(400).json({ error: '_id parameter is required.' });
    }


    res.send(await deleteAlertByIdBL(_id));
});

module.exports = router;