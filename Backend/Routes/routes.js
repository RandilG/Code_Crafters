const express = require("express");
const router = express.Router();

const pendingJobs = require("../Functions/JobPoster/Jobs/fetchPending");
const approvedJobs = require("../Functions/JobPoster/Jobs/fetchApproved");
const declinedJobs = require("../Functions/JobPoster/Jobs/fetchDeclined");
const payments = require("../Functions/JobPoster/Financial/payments");
const createPaymentIntent = require("../Functions/JobPoster/Financial/paymentIntent");
const futureJobs = require("../Functions/JobPoster/Jobs/fetchFutureJobs");
// const sendMessage = require('../Functions/JobPoster/posterChat/sendMessagePoster');
// const getMessage = require('../Functions/JobPoster/GetMessage/getMessage');
const getMessagePoster = require("../Functions/JobPoster/posterChat/getMessagePoster");
const getMessageSeeker = require("../Functions/JobSeeker/seekerChat/getMessageSeeker");
const sendMessagePoster = require("../Functions/JobPoster/posterChat/sendMessagePoster");
const sendMessageSeeker = require("../Functions/JobSeeker/seekerChat/sendMessageSeeker");
const getSeekers = require("../Functions/Admin/chat/fetchSeekers");
const getPosters = require("../Functions/Admin/chat/fetchPosters");
const jobTimer = require("../Functions/JobPoster/Jobs/jobTimer");
const fetchPosterChats = require("../Functions/Admin/chat/fetchPosterChats");
const fetchSeekerChats = require("../Functions/Admin/chat/fetchSeekerChats");

router.get("/fetchSeekerChats", (req,res) => {
  fetchSeekerChats(req,res);
})

router.get("/fetchPosterChats", (req, res) => {
    fetchPosterChats(req, res);
})

router.post("/createPaymentIntent", (req, res) => {
  createPaymentIntent(req, res);
});

router.get("/fetchPending/:jobPoster", (req, res) => {
  pendingJobs(req, res);
});

router.get("/fetchApproved/:jobPoster", (req, res) => {
  approvedJobs(req, res);
});

router.get("/fetchDeclined/:jobPoster", (req, res) => {
  declinedJobs(req, res);
});

router.post("/payments/:tempJobId", (req, res) => {
  payments(req, res);
});

router.get("/fetchFutureJobs/:jobPoster", (req, res) => {
  futureJobs(req, res);
});

router.get("/getMessagePoster/:jobPoster", (req, res) => {
  getMessagePoster(req, res);
});

router.get("/getMessageSeeker/:jobSeeker", (req, res) => {
  getMessageSeeker(req, res);
});

router.post("/sendMessagePoster", (req, res) => {
  sendMessagePoster(req, res);
});

router.post("/sendMessageSeeker", (req, res) => {
  sendMessageSeeker(req, res);
});

router.get("/fetchPosters", (req, res) => {
  getPosters(req, res);
});

router.get("/fetchSeekers", (req, res) => {
  getSeekers(req, res);
});

router.post("/jobTimer", (req, res) => {
  jobTimer(req, res);
});


module.exports = router;
