const express = require('express')
const router = express.Router()

const getData = require('../Functions/Test/getData')
const postData = require('../Functions/Test/postData')
const deleteData = require('../Functions/Test/deleteData')
const updateData = require('../Functions/Test/updateData')
const login = require('../Admin/SuperAdmin/login')
const register = require('../Admin/SuperAdmin/register')

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

// router.get('/', (req, res) => {
//     res.send('Welcome to the login and registration system!');
//   });


router.post('/login', (req, res) => {
  login(req, res)
  });

router.post('/register', (req, res) => {
  register(req, res)
  });

module.exports = router