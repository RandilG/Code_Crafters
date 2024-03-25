const express = require('express')
const router = express.Router()

const payment = require('../Functions/Financial/payment')
const pendingJobs = require('../Functions/Jobs/fetchPending')
const approvedJobs = require('../Functions/Jobs/fetchApproved')
const declinedJobs = require('../Functions/Jobs/fetchDeclined')

router.get('/fetchPending/:jobPoster' , (req, res) => {
    pendingJobs(req, res);
})

router.get('/fetchApproved/:jobPoster' , (req, res) => {
    approvedJobs(req, res);
})

router.get('/fetchDeclined/:jobPoster' , (req, res) => {
    declinedJobs(req, res);
})

router.post('/payment', (req, res) => {
    payment(req, res)
})

module.exports = router