const express = require('express')
const router = express.Router()

const getData = require('../Functions/Test/getData')
const postData = require('../Functions/Test/postData')
const deleteData = require('../Functions/Test/deleteData')
const updateData = require('../Functions/Test/updateData')
const login = require('../Functions/User/JobPoster/login')
const register = require('../Functions/User/JobPoster/register')
//const jobposterRegister = require('./../Functions/User/JobPoster/register')
const emailverify = require('../Functions/Otp/checkEmail')



router.get('/getData', (req, res) => {
    getData(req, res)
})

router.post('/addData', (req, res) => {
    postData(req, res)
})

router.delete('/deleteData', (req, res) => {
    deleteData(req, res)
})

router.put('/putData', (req, res) => {
    updateData(req, res)
})

router.post('/login', (req, res) => {
  login(req, res)
  });

router.post('/register', (req, res)=> {
  register(req, res);
  })

router.post('/sendotp', (req, res) => {
  emailverify(req, res)
})

module.exports = router