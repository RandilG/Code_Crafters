const express = require('express')
const router = express.Router()

const pendingJobs = require('../Functions/JobPoster/Jobs/fetchPending');
const approvedJobs = require('../Functions/JobPoster/Jobs/fetchApproved');
const declinedJobs = require('../Functions/JobPoster/Jobs/fetchDeclined');
const payments = require('../Functions/JobPoster/Financial/payments');
const createPaymentIntent = require('../Functions/JobPoster/Financial/paymentIntent');
const checkSeekerAvailability = require('../Functions/JobSeeker/SignUp/checkEmailAvailability');
const checkMobNoAvailability = require('../Functions/JobSeeker/SignUp/checkMobNoAvilability');
const checkNicAvailability = require('../Functions/JobSeeker/SignUp/checkNicAvailability');
const sendMobOtp = require('../Functions/Common/otp/sendMobOtp');
const verifyOtp = require('../Functions/Common/otp/verifyOtp');
const sendMailOtp = require('../Functions/Common/otp/sendMailOtp');

router.post('/sendMailOtp', (req, res) => {
    sendMailOtp(req, res);
})

router.get('/verifyOtp/:user/:otp', (req, res) => {
    verifyOtp(req, res);
})

router.post('/sendMobOtp', (req, res) => {
    sendMobOtp(req, res);
})

router.get('/seekerNicAvailability/:nic', (req, res) => {
    checkNicAvailability(req, res);
})

router.get('/seekerMobNoAvilability/:mobNo', (req, res) => {
    checkMobNoAvailability(req, res);
})

router.get('/seekerAvailability/:email', (req, res) => {
    checkSeekerAvailability(req, res);
})

router.post('/createPaymentIntent', (req, res) => {
    createPaymentIntent(req, res);
})

router.get('/fetchPending/:jobPoster' , (req, res) => {
    pendingJobs(req, res);
})

router.get('/fetchApproved/:jobPoster' , (req, res) => {
    approvedJobs(req, res);
})

router.get('/fetchDeclined/:jobPoster' , (req, res) => {
    declinedJobs(req, res);
})
  
router.post('/payments/:tempJobId' , (req, res) => {
    payments(req, res);
})

module.exports = router