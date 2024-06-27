const express = require("express");
const router = express.Router();

const jobPosterRequests = require("../Functions/ProfileAdmin/JobPosterRequests/JobPosterRequests");
const declineRequest = require("../Functions/ProfileAdmin/DeclineRequest/DeclineRequest");
const acceptJobPosterRequest = require("../Functions/ProfileAdmin/AcceptJobPosterRequest/AcceptJobPosterRequest");
const declinedAccounts = require("../Functions/ProfileAdmin/DeclinedAccounts/DeclinedAccounts");
const activeAccounts = require("../Functions/ProfileAdmin/ActiveAccounts/ActiveAccounts");
const getHoldAccounts = require("../Functions/ProfileAdmin/GetHoldAccounts/GetHoldAccounts");
const activateAccount = require("../Functions/ProfileAdmin/ActivateAccount/ActivateAccount");
const deactivateAccount = require("../Functions/ProfileAdmin/DeactivateAccount/DeactivateAccount");
const declineJobSeekerRequest = require("../Functions/ProfileAdmin/DeclineJobSeekerRequest/DeclineJobSeekerRequest");
const jobSeekerRequests = require("../Functions/ProfileAdmin/JobSeekerRequests/JobSeekerRequests");
const acceptJobSeekerRequest = require("../Functions/ProfileAdmin/AcceptJobSeekerRequest/AcceptJobSeekerRequest");
const getActiveJobSeekers = require("../Functions/ProfileAdmin/GetActiveJobSeekers/GetActiveJobSeekers");
const getDeclinedJobSeekrs = require("../Functions/ProfileAdmin/GetDeclinedJobSeekers/GetDeclinedJobSeekers");
const getDeactivatedJobSeekers = require("../Functions/ProfileAdmin/GetDeactivatedJobSeekers/GetDeactivatedJobSeeker");
const activateJobSeeker = require("../Functions/ProfileAdmin/ActivateJobSeeker/ActivateJobSeeker");
const deactivateJobseeker = require("../Functions/ProfileAdmin/DeactivateJobSeeker/DeactivateJobSeeker");
const getJobPoterAvgRatings = require("../Functions/ProfileAdmin/GetJobPosterAvgRatings/GetJobPosterAvgRatings");
const getJobSeekerAvgRatings = require("../Functions/ProfileAdmin/GetJobSeekerRatings/GetJobSeekerAvgRatings");
const profileAdminLogin = require("../Functions/ProfileAdmin/ProfileAdminLogin/ProfileAdminLogin");
const changePassword = require("../Functions/ProfileAdmin/ChangePassword/ChangePassword");
const sendMailOtp = require("../Functions/Common/otp/sendMailOtp");
const verifyOtp = require("../Functions/Common/otp/verifyOtp");
const resetPassword = require("../Functions/ProfileAdmin/ResetPassword/ResetPassword");
const getProfileAdmin = require("../Functions/ProfileAdmin/GetProfileAdmin/GetProfileAdmin");
const updateProfileAdmin = require("../Functions/ProfileAdmin/UpdateProfileAdmin/UpdateProfileAdmin");
const updateAdminPassword = require("../Functions/ProfileAdmin/UpdateAdminPassword/UpdateAdminPassword");

//routes

router.get("/jobposterrequests", (req, res) => {
  jobPosterRequests(req, res);
});

router.put("/declinerequest/:id", (req, res) => {
  declineRequest(req, res);
});

router.put("/acceptrequest/:id", (req, res) => {
  acceptJobPosterRequest(req, res);
});

router.get("/declinedaccounts", (req, res) => {
  declinedAccounts(req, res);
});

router.get("/activeaccounts", (req, res) => {
  activeAccounts(req, res);
});

router.get("/getholdedaccounts", (req, res) => {
  getHoldAccounts(req, res);
});

router.put("/activateaccount/:id", (req, res) => {
  activateAccount(req, res);
});

router.put("/deactivateaccount/:id", (req, res) =>{
  deactivateAccount(req, res);
});


router.get("/getjobseekerrequests", (req, res)=>{
  jobSeekerRequests(req, res)
})

router.put("/declinejobseeker/:id" , (req, res)=>{
  declineJobSeekerRequest(req, res);
});

router.put("/acceptjobseekerrequest/:id", (req, res)=>{
  acceptJobSeekerRequest(req, res);
});

router.get("/activejobseerkers", (req, res)=>{
  getActiveJobSeekers(req, res)
});

router.get("/declinedjobseerkers", (req, res)=>{
  getDeclinedJobSeekrs(req, res)
});

router.get("/getdeactivatedseekers", (req, res)=>{
  getDeactivatedJobSeekers(req, res);
});

router.put("/activateseeker/:id", (req, res)=>{
  activateJobSeeker(req, res)
});

router.put("/deactivateseeker/:id", (req, res)=>{
  deactivateJobseeker(req, res);
});

router.get('/job-poster-avg-ratings', (req, res)=>{
  getJobPoterAvgRatings(req, res)
})

router.get('/job-seeker-avg-ratings', (req, res)=>{
  getJobSeekerAvgRatings(req, res)
})

router.post('/profile-admin-login', (req, res)=>{
  profileAdminLogin(req, res);
})

router.post('/profile-admin-change-password', (req, res)=>{
  changePassword(req, res)
})


router.post('/request-otp', (req, res)=>{
  sendMailOtp(req,res)
} );
router.post('/verify-otp', (req, res)=>{
  verifyOtp(req,res)
});
router.post('/reset-password', (req, res)=>{
  resetPassword(req,res)
});


router.get('/get-admin-data', (req,res)=>{
  getProfileAdmin(req,res)
})

router.put('/update-admin', (req, res)=>{
  updateProfileAdmin(req, res)
})

router.put('/update-admin-password', (req, res)=>{
  updateAdminPassword(req, res)
})

module.exports = router;
