const emailService = require('../services/emailService');
const { getPatientByEmail, updatePassword } = require('../repositories/patientRepo');

// Generate a random verification code
function generateVerificationCode() {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const timestamp = Date.now();
    const expiration = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    return { code, timestamp, expiration };
}

const verificationCodes = {}; // Store codes temporarily in memory

// Send a mail with verification code
exports.initiateReset = (req, res) => {
    const { email } = req.body;
    // const patient = getPatientByEmail(email);

    // if (!patient) {
    //     return res.status(404).json({ message: 'patient not found' });
    // }

    
    const verificationInfo = generateVerificationCode();

    // Store the verification info in memory
    if (!verificationCodes[email]) {
        verificationCodes[email] = { ...verificationInfo, attempts: 0, resend: 0 };
    }
    // Check attempts and resend counters and block if necessary
    else {
        if (verificationCodes[email].resend >= 10) {
            const storedInfo = verificationCodes[email];
            if (!storedInfo.unblockTime) {
                storedInfo.unblockTime = Date.now() + 5 * 60 * 1000; // 5 minitues in milliseconds
            } if (storedInfo.unblockTime > Date.now()) {
                errorCode = "TOO_MUCH_ATTEMPTS";
                return res.status(403).json({ success: false, errorCode, unblockTime: storedInfo.unblockTime, message: 'Too many unsuccessful attempts. User blocked.' });
            }
            storedInfo.attempts = 0;
            storedInfo.resend = 0;
            storedInfo.unblockTime = null;

        }
        verificationCodes[email] = {
            ...verificationCodes[email],
            ...verificationInfo,
            resend: verificationCodes[email].resend + 1
        };
    }

    try {
        emailService.sendVerificationCode(email, verificationInfo.code);
        return res.status(200).json({ message: 'Verification code sent successfully' });
    } catch {
        return res.status(500).json({ message: 'Error sending email' });
    }

};

// Verify the code
exports.emailVerification = (req, res) => {
    const { email, verificationCode } = req.body;
    let errorCode = 'UNKNOWN_ERROR';

    // Retrieve the stored verification info
    const storedInfo = verificationCodes[email];

    if (!storedInfo) {
        errorCode = "CODE_NOT_FOUND";
        return res.status(404).json({ success: false, errorCode, message: 'Code is not found' });
    }
    // Check attempts and resend counters and block if necessary
    if (storedInfo.attempts >= 10 || storedInfo.resend >= 10) {
        if (!storedInfo.unblockTime) {
            storedInfo.unblockTime = Date.now() + 5 * 60 * 1000; // 5 minitues in milliseconds
        } if (storedInfo.unblockTime > Date.now()) {
            errorCode = "TOO_MUCH_ATTEMPTS";
            return res.status(403).json({ success: false, errorCode, unblockTime: storedInfo.unblockTime, message: 'Too many unsuccessful attempts. User blocked.' });
        }
        storedInfo.attempts = 0;
        storedInfo.resend = 0;
        storedInfo.unblockTime = null;
    }

    // Check if the code has expired
    const elapsedTime = Date.now() - storedInfo.timestamp;
    if (elapsedTime > storedInfo.expiration) {
        errorCode = "EXPIRED_CODE";
        delete verificationCodes[email];
        return res.status(400).json({ success: false, errorCode, message: 'Verification code has expired' });
    }

    if (!storedInfo || storedInfo.code !== verificationCode) {
        errorCode = "INVALID_CODE_ERROR";
        // Increment attempts counter
        storedInfo.attempts += 1;
        return res.status(404).json({ success: false, errorCode, message: 'Invalid verification code or email' });
    }

    delete verificationCodes[email];
    return res.status(200).json({ message: 'The email has been successfully verified' });
};

// Resets the password
exports.completeReset = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'email and password parameters are required.' });
    }
    return res.send(await updatePassword(email, password));
}
