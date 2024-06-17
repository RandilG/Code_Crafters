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
const postJob = require('../Functions/User/JobPoster/postJob')
const displayJob = require('../Functions/User/JobPoster/displayJob')
const displayallJob = require('../Functions/User/JobPoster/displayallJob')
const updateJob = require('../Functions/User/JobPoster/updateJob')
const deleteJob = require('../Functions/User/JobPoster/deleteJob')
const rateSeeker = require('../Functions/User/JobPoster/rateSeeker')
const displayallPaymentInfo = require('../Functions/User/JobPoster/displayallPaymentInfo')
const displayPaymentInfo = require('../Functions/User/JobPoster/displayPaymentInfo')
const changePassword = require('../Functions/User/JobPoster/changePassword')
const viewallCompletedJobInfo = require('../Functions/User/JobPoster/viewallCompletedJobInfo')
const viewCompletedJobInfo = require('../Functions/User/JobPoster/viewCompletedJobInfo')
/*const cancelJob = require('../Functions/User/JobPoster/cancelJob')*/


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

router.post('/postJob', (req, res) => {  
  postJob(req, res)
})

router.get('/displayJob/:id', (req, res) => {  
  displayJob(req, res)
})

router.get('/displayallJob', (req, res) => {  
  displayallJob(req, res)
})

router.put('/updateJob/:id', (req, res) => {  
  updateJob(req, res)
})

router.delete('/deleteJob/:id', (req, res) => {  /**** */
  console.log("delete job called")
  deleteJob(req, res)
})

router.post('/rateSeeker', (req, res) => {  
  rateSeeker(req, res)
})

router.get('/displayallPaymentInfo', (req, res) => {  
  displayallPaymentInfo(req, res)
})

router.get('/displayPaymentInfo/:id', (req, res) => {    
  displayPaymentInfo(req, res)
})

router.post('/changePassword', (req, res) => {  
  changePassword(req, res)
})

router.get('/viewallCompletedJobInfo', (req, res) => { 
  viewallCompletedJobInfo(req, res)
})

router.get('/viewCompletedJobInfo/:id', (req, res) => {    
  viewCompletedJobInfo(req, res)
})

/*router.put('/cancelJob/:id', (req, res) => {  
  cancelJob(req, res)
})*/

module.exports = router