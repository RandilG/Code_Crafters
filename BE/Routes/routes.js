const express = require("express");
const router = express.Router();

const jobPosterRequests = require("../Functions/JobPosterRequests/JobPosterRequests");
const declineRequest = require("../Functions/DeclineRequest/DeclineRequest");
const acceptJobPosterRequest = require("../Functions/AcceptJobPosterRequest/AcceptJobPosterRequest");
const declinedAccounts = require("../Functions/DeclinedAccounts/DeclinedAccounts");
const activeAccounts = require("../Functions/ActiveAccounts/ActiveAccounts");
const getHoldAccounts = require("../Functions/GetHoldAccounts/GetHoldAccounts");
const activateAccount = require("../Functions/ActivateAccount/ActivateAccount");
const deactivateAccount = require("../Functions/DeactivateAccount/DeactivateAccount");
const declineJobSeekerRequest = require("../Functions/DeclineJobSeekerRequest/DeclineJobSeekerRequest");
const jobSeekerRequests = require("../Functions/JobSeekerRequests/JobSeekerRequests");
const acceptJobSeekerRequest = require("../Functions/AcceptJobSeekerRequest/AcceptJobSeekerRequest");
const getActiveJobSeekers = require("../Functions/GetActiveJobSeekers/GetActiveJobSeekers");
const getDeclinedJobSeekrs = require("../Functions/GetDeclinedJobSeekers/GetDeclinedJobSeekers");
const getDeactivatedJobSeekers = require("../Functions/GetDeactivatedJobSeekers/GetDeactivatedJobSeeker");
const activateJobSeeker = require("../Functions/ActivateJobSeeker/ActivateJobSeeker");
const deactivateJobseeker = require("../Functions/DeactivateJobSeeker/DeactivateJobSeeker");

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
  console.log("aaaaa")
  deactivateJobseeker(req, res);
});

module.exports = router;
