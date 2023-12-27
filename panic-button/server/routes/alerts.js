const express = require('express');
const {
    getAllAlertsBL,
    getAlertsByPatientIdBL,
    getAlertsByPatientEmailBL,
    getAlertByIdBL,
    addAlertBL,
    deleteAlertByIdBL,
    deleteAlertsByStatusBL,
    updateAlertByIdBL,
    getActiveAlertsByPatientIdBL
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

router.get('/get-active-alerts-by-patient-id/:id', async (req, res) => {
    console.log(req.params.id)
    const _id = req.params.id;
    if (!_id) {
        return res.status(400).json({ error: '_id parameter is required.' });
    }

    res.send(await getActiveAlertsByPatientIdBL(_id));
});

router.put('/update-alert/:id', async (req, res) => {
    const alertId = req.params.id;
    const updateData = req.body;
    
    if (!updateData) {
        return res.status(400).json({ error: 'Alert not found' });
    }
    res.send(await updateAlertByIdBL(alertId, updateData))

});

router.post('/add-alert/', async (req, res) => {
    const { patient, distressDescription, level, location, status } = req.body;
    const moment = require('moment-timezone');

    const localTimeZone = moment.tz.guess();
    const currentTime = moment().tz(localTimeZone);

    const date = new Date();
    const utcHours = currentTime.hours();
    const utcMinutes = currentTime.minutes();
    const utcSeconds = currentTime.seconds();

    date.setUTCHours(utcHours, utcMinutes, utcSeconds);

    res.send(await addAlertBL({ patient, distressDescription, level, date, location, status }));
});



// router.delete('/delete-by-id/', async (req, res) => {
//     const { _id } = req.body;
//     if (!_id) {
//         return res.status(400).json({ error: '_id parameter is required.' });
//     }


//     res.send(await deleteAlertByIdBL(_id));
// });

// router.delete('/delete-by-status/', async (req, res) => {
//     const { statusToDelete } = req.body;
//     if (!statusToDelete) {
//         return res.status(400).json({ error: '_id parameter is required.' });
//     }
//     res.send(await deleteAlertsByStatusBL(statusToDelete));
// });

module.exports = router;