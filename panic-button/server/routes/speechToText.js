const { isWordInRecord } = require('../controllers/speechToTextController');

const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, recordFile, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, recordFile, cb) {
        cb(null, recordFile.fieldname + '-' + Date.now() + '.mp3');
    }
});

const upload = multer({ storage: storage });


router.post('/speech-to-text/', upload.single('recordFile'), async (req, res) => {
    const { keyWord } = req.body; // Extract keyWord from req.body
    const recordFile = req.file; // Extract recordFile from req.file

    if (!recordFile) {
        return res.status(400).send('No file uploaded.');
    }
    if(!keyWord){
        return res.status(400).send('No key word received.');
    }
    console.log("recordFile!!!:", recordFile);
    console.log("finish print the recordFile!");
    console.log("keyWord:", keyWord);

    try {
        const {isKeyWordInTranscription, transcription} = await isWordInRecord(recordFile, keyWord);
        return res.status(200).send({'isKeyWordInTranscription':isKeyWordInTranscription, 'transcription':transcription});
    }
    catch (error) {
        console.error('Error:', error);
        return res.status(500).send('Error processing the file.');
    }
});

module.exports = router;
