const express = require('express')
const router = express.Router()

//Common
const sendMobOtp = require('../Functions/Common/otp/sendMobOtp');
const verifyOtp = require('../Functions/Common/otp/verifyOtp');
const sendMailOtp = require('../Functions/Common/otp/sendMailOtp');

router.get('/verifyOtp/:user/:otp', (req, res) => {
    verifyOtp(req, res);
})

router.post('/sendMobOtp', (req, res) => {
    sendMobOtp(req, res);
})

router.post('/sendMailOtp', (req, res) => {
    sendMailOtp(req, res);
})

//Poster
const approvedJobs = require('../Functions/JobPoster/Jobs/fetchApproved');
const declinedJobs = require('../Functions/JobPoster/Jobs/fetchDeclined');
const payments = require('../Functions/JobPoster/Financial/payments');
const createPaymentIntent = require('../Functions/JobPoster/Financial/paymentIntent');
const pendingJobs = require('../Functions/JobPoster/Jobs/fetchPending');

router.get('/fetchPending/:jobPoster' , (req, res) => {
    pendingJobs(req, res);
})

router.post('/createPaymentIntent', (req, res) => {
    createPaymentIntent(req, res);
})

router.post('/payments/:tempJobId' , (req, res) => {
    payments(req, res);
})

router.get('/fetchDeclined/:jobPoster' , (req, res) => {
    declinedJobs(req, res);
})

router.get('/fetchApproved/:jobPoster' , (req, res) => {
    approvedJobs(req, res);
})

//Seeker
const checkSeekerAvailability = require('../Functions/JobSeeker/SignUp/checkEmailAvailability');
const checkMobNoAvailability = require('../Functions/JobSeeker/SignUp/checkMobNoAvilability');
const checkNicAvailability = require('../Functions/JobSeeker/SignUp/checkNicAvailability');
const createSeeker = require('../Functions/JobSeeker/SignUp/createSeeker');

router.post('/createSeeker', (req, res) => {
    createSeeker(req, res);
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

//Profile Admin
const getPendingSeekers = require('../Functions/Admin/Profile/getPendingSeekers');
const updateSeekerStatus = require('../Functions/Admin/Profile/updateSeekerStatus');

router.put('/updateSeekerStatus/:seekerUname', (req, res) => {
    updateSeekerStatus(req, res);
})

router.get('/getPendingSeekers', (req, res) => {
    getPendingSeekers(req, res);
})

module.exports = router