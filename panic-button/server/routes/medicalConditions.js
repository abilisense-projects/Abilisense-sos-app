const express = require('express');
const {
    getAllMedicalConditionsBL,
    getMedicalConditionsByIddBL,
    addMedicalConditionsBL,
    deleteMedicalConditionsByIdBL,
} = require('../controllers/medicalConditionsController')
const router = express.Router();

router.get('/get-all/', async (req, res) => {
    res.send(await getAllMedicalConditionsBL());
});

router.post('/get-by-id/', async (req, res) => {
    const { _id } = req.body;
    if (!_id) {
        return res.status(400).json({ error: '_id parameter is required.' });
    }
    res.send(await getMedicalConditionsByIddBL(_id));
});

router.post('/add-medical-conditions/', async (req, res) => {
    console.log("routes");
    console.log('Request Payload in routes:', req.body);

    const { patient, medicalConditions } = req.body;

    try {
        const result = await addMedicalConditionsBL( patient, medicalConditions );
        res.send(result);
    } catch (error) {
        console.error('Error adding medical conditions:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/delete-by-id/', async (req, res) => {
    const { _id } = req.body;
    if (!_id) {
        return res.status(400).json({ error: '_id parameter is required.' });
    }
    res.send(await deleteMedicalConditionsByIdBL(_id));
});

module.exports = router;