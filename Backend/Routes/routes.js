const express = require('express')
const router = express.Router()

const getData = require('../Functions/Test/getData')
const postData = require('../Functions/Test/postData')
const deleteData = require('../Functions/Test/deleteData')
const updateData = require('../Functions/Test/updateData')
const login = require('../Functions/User/JobPoster/login')
const register = require('../Functions/User/JobPoster/register')
//const jobposterRegister = require('./../Functions/User/JobPoster/register')
const emailVerify = require('../Functions/Otp/emailVerify')
const sendMobOtp = require('../Functions/Otp/sendMobOtp');
const verifyOtp = require('../Functions/Otp/verifyOtp');
const postJob = require('../Functions/User/JobPoster/postJob')
const displayJob = require('../Functions/User/JobPoster/displayJob')
const displayallJob = require('../Functions/User/JobPoster/displayallJob')
const updateJob = require('../Functions/User/JobPoster/updateJob')
const deleteJob = require('../Functions/User/JobPoster/deleteJob')
const rateSeeker = require('../Functions/User/JobPoster/rateSeeker')
const changePassword = require('../Functions/User/JobPoster/changePassword')
const viewallCompletedJobInfo = require('../Functions/User/JobPoster/viewallCompletedJobInfo')
const viewCompletedJobInfo = require('../Functions/User/JobPoster/viewCompletedJobInfo')
const viewJobSeeker = require('../Functions/User/JobPoster/viewJobSeeker');
const displayJobData = require('../Functions/User/JobPoster/displayJobData')
const updateProfile = require('../Functions/User/JobPoster/updateProfile')
const updateProfilePicture = require('../Functions/User/JobPoster/updateProfilePicture')
const displayProfileInfo = require('../Functions/User/JobPoster/displayProfileInfo')
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
  console.log("Called")
  register(req, res);
  })

router.post('/emailVerify', (req, res) => {  
  emailVerify(req, res)
})

router.get('/verifyOtp/:user/:otp', (req, res) => {
  verifyOtp(req, res);
})

router.post('/sendMobOtp', (req, res) => {
  sendMobOtp(req, res);
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

router.post('/changePassword', (req, res) => {  
  changePassword(req, res)
})

router.get('/viewallCompletedJobInfo', (req, res) => { 
  viewallCompletedJobInfo(req, res)
})

router.get('/viewCompletedJobInfo/:id', (req, res) => {    
  viewCompletedJobInfo(req, res)
})

router.get('/viewJobSeeker', (req, res) => {
  viewJobSeeker(req, res)
});

router.get('/displayJobData', (req, res) => {
  displayJobData(req, res)
})

router.put('/updateProfile/:id', (req, res) => {  
  updateProfile(req, res)
})

router.put('/updateProfilePicture/:id', (req, res) => {  
  updateProfilePicture(req, res)
})

router.get('/displayProfileInfo/:EmailAddress', (req, res) => {    
  displayProfileInfo(req, res)
})

/*router.put('/cancelJob/:id', (req, res) => {  
  cancelJob(req, res)
})*/


module.exports = router