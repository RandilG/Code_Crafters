const express = require('express')
const router = express.Router()

const getData = require('../Functions/Test/getData')
const postData = require('../Functions/Test/postData')

router.get('/getData', (req, res) => {
    getData(req, res)
})

router.post('/addData', (req, res) => {
    postData(req, res)
})


module.exports = router