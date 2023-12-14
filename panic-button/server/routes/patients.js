const express = require('express');
const { getAllPatientsBL,
    getPatientByEmailBL,
    getPatientByIdBL,
    addPatientBL,
    deletePatientByEmailBL,
    deletePatientByIdBL,
    getPatientByEmailAndPasswordBL } = require('../controllers/patientController')
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

const jwt = require('jsonwebtoken');

require('dotenv').config();

const secretKey = process.env.SECRET_KEY;

router.post('/get-by-email-and-password/', async (req, res) => {
    const { email, password } = req.body;
    console.log('email'+email, 'password'+password);
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and Password parameters are required.' });
    }
    try {
      // Authenticate user - this is just an example, replace with your own authentication logic
      const user = await getPatientByEmailAndPasswordBL(email, password);
      console.log("user", user)
      if (user) {
        // User authenticated successfully, generate JWT token
        const token = jwt.sign({ email, password}, secretKey, { expiresIn: '7d' });
        
        // Respond with success and token
        res.status(200).json({ success: true, token: token, user: user });
      } else {
        res.status(401).json({ success: false, message: 'Auth fail' });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
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