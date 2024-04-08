const express = require('express')
const router = express.Router()

const pendingJobs = require('../Functions/JobPoster/Jobs/fetchPending');
const approvedJobs = require('../Functions/JobPoster/Jobs/fetchApproved');
const declinedJobs = require('../Functions/JobPoster/Jobs/fetchDeclined');
const payments = require('../Functions/JobPoster/Financial/payments');
const createPaymentIntent = require('../Functions/JobPoster/Financial/paymentIntent');

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