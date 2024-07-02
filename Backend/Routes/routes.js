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
const jobTimer = require('../Functions/JobPoster/Jobs/jobTimer');

router.post('/jobTimer', (req, res) => {
    jobTimer(req, res);
})

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
const signin = require('../Functions/JobSeeker/SignIn/signin');
const seekerAuth = require('../Functions/JobSeeker/SignIn/auth');
const dashboard = require('../Functions/JobSeeker/GetData/dashboard');
const jobList = require('../Functions/JobSeeker/Jobs/jobList');
const applyJob = require('../Functions/JobSeeker/Jobs/applyJob');
const appliedJobs = require('../Functions/JobSeeker/Jobs/aplliedJobs');
const completedJobs = require('../Functions/JobSeeker/Jobs/completedJobs');
const ratePoster = require('../Functions/JobSeeker/Rates_Review/ratePoster');
const getWalletData = require('../Functions/JobSeeker/Wallet/getWalletData');
const checkBankAccount = require('../Functions/JobSeeker/Wallet/checkBankAccount');
const createBankAc = require('../Functions/JobSeeker/Wallet/createBankAc');
const withdraw = require('../Functions/JobSeeker/Wallet/withdraw');
const getProfile = require('../Functions/JobSeeker/GetData/profile');
const updateProfile = require('../Functions/JobSeeker/Profile/update');
const changePassword = require('../Functions/JobSeeker/Profile/changePassword');
const deleteAccount = require('../Functions/JobSeeker/Profile/deleteAccount');

router.put('/deleteAccount/:userName', (req, res) => {
    deleteAccount(req, res);
})

router.put('/changePassword/:userName', (req, res) => {
    changePassword(req, res);
})

router.put('/updateProfile/:userName', (req, res) => {
    updateProfile(req, res);
})

router.get('/profile/:userName', (req, res) => {
    getProfile(req, res);
});

router.post('/withdraw', (req, res) => {
    withdraw(req, res);
});

router.post('/createBankAc', (req, res) => {
    createBankAc(req, res);
});

router.get('/checkBankAccount/:userName', (req, res) => {
    checkBankAccount(req, res);
});

router.get('/walletData/:userName', (req, res) => {
    getWalletData(req, res);
})

router.post('/ratePoster/:userName/:job_id', (req, res) => {
    ratePoster(req, res);
})

router.get('/completedJobs/:userName', (req, res) => {
    completedJobs(req, res);
})

router.get('/appliedJobs/:userName', (req, res) => {
    appliedJobs(req, res);
})

router.post('/applyJob', (req, res) => {
    applyJob(req, res);
})

router.get('/jobList', (req, res) => {
    jobList(req, res);
})

router.get('/dashboard/:userName', (req, res) => {
    dashboard(req, res);
})

router.get('/seekerAuth/:token/:userName', (req, res) => {
    seekerAuth(req, res);
})

router.get('/signin/:userName/:password', (req, res) => {
    signin(req, res);
})

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


//Test purpose
const test = require('../Functions/Test/test');
router.post('/test', (req, res) => {
    test(req, res);
})

module.exports = router