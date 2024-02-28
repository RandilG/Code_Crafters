const express = require('express')
const router = express.Router()

const getData = require('../Functions/Test/getData')
const postData = require('../Functions/Test/postData')
const deleteData = require('../Functions/Test/deleteData')
const updateData = require('../Functions/Test/updateData')
const login = require('../Admin/SuperAdmin/login')
const adminRegister = require('./../Admin/SuperAdmin/register');
const emailverify = require('../Functions/otp/emailverification')


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
  adminRegister(req, res);
  })

router.post('/sendotp', (req, res) => {
  emailverify(req, res)
})

module.exports = router