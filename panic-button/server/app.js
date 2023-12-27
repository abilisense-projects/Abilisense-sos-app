const express = require('express');
const cors = require('cors');
const { connectToDB } = require('./db');
const patients = require('./routes/patients');
const alerts = require('./routes/alerts');
const medicalConditions = require('./routes/medicalConditions');
require('dotenv').config();

const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use(cors());

app.use('/api/patients', patients);
app.use('/api/alerts', alerts);
app.use('/api/medicalConditions', medicalConditions);


const startApp = async () => {
    try {
        await connectToDB();
        app.listen(port, () => {
            console.log(`Server listening at http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Error starting the app:', error);
    }

};

startApp();
