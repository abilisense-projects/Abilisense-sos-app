const express = require('express');
const router = express.Router();
const passwordResetController = require('../controllers/passwordResetController');

router.post('/initiate-reset', passwordResetController.initiateReset);
router.post('/email-verification', passwordResetController.emailVerification);
router.post('/complete-reset', passwordResetController.completeReset);

module.exports = router;
