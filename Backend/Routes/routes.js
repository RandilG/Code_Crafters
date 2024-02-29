const express = require('express')
const router = express.Router()

const payment = require('../Functions/Financial/payment')


router.post('/payment', (req, res) => {
    payment(req, res)
})

module.exports = router