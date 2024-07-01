const express = require('express');
const router = express.Router();

// OTP routes
const verifyOtp = require('../Functions/Common/otp/verifyOtp');
const sendMailOtp = require('../Functions/Common/otp/sendMailOtp');

router.post('/verifyOtp', (req, res) => {
    verifyOtp(req, res);
});

router.post('/sendMailOtp', (req, res) => {
    sendMailOtp(req, res);
});


//Signup Process
const requestOtp = require('../Functions/SuperAdmin/SignupOtp/emailverification');
const verifyEmail = require('../Functions/SuperAdmin/SignupOtp/verifyEmail');
const saveUserRouter = require('../Functions/SuperAdmin/AdminRegister/saveUser');

router.post('/requestOtp', (req, res) => {
    requestOtp(req, res);
});

router.post('/verifyEmail', (req, res) => {
    verifyEmail(req, res);
});

router.post('/resendOtp', (req, res) => {
    requestOtp(req, res);
});

router.post('/saveUser', (req, res) => {
    saveUserRouter(req, res);
});


// Test routes
const getData = require('../Functions/Test/getData');
const postData = require('../Functions/Test/postData');
const deleteData = require('../Functions/Test/deleteData');
const updateData = require('../Functions/Test/updateData');

router.get('/getData', (req, res) => {
    getData(req, res);
});

router.post('/addData', (req, res) => {
    postData(req, res);
});

router.delete('/deleteData', (req, res) => {
    deleteData(req, res);
});

router.put('/putData', (req, res) => {
    updateData(req, res);
});

// Admin routes
const adminRegister = require('../Functions/SuperAdmin/AdminRegister/register');
const FinancialAdminLogin = require('../Functions/FinancialAdmin/FinancialAdminLogin/FinancialAdminLogin');
const ChangePassword = require('../Functions/Common/ChangePassword/ChangePassword');
const resetPassword = require('../Functions/Common/ResetPassword/ResetPassword');
const FetchAdminProfile = require('../Functions/Common/FetchAdminProfile/FetchAdminProfile');
const UpdateAdminProfile = require('../Functions/Common/UpdateAdminProfile/UpdateAdminProfile');
const updateAdminPassword = require('../Functions/Common/UpdateAdminPassword/UpdateAdminPassword');
const SuperAdminLogin = require('../Functions/SuperAdmin/SuperAdminLogin/SuperAdminLogin')

router.post('/register', (req, res) => {
    adminRegister(req, res);
});

router.post('/financial-admin-login', (req, res) => {
    FinancialAdminLogin(req, res);
});

router.post('/super-admin-login', (req, res) => {
    SuperAdminLogin(req, res);
});

router.post('/financial-admin-change-password', (req, res) => {
    ChangePassword(req, res);
});

router.post('/reset-password', (req, res) => {
    resetPassword(req, res);
});

router.get('/get-admin-data', (req, res) => {
    FetchAdminProfile(req, res);
});

router.put('/update-admin', (req, res) => {
    UpdateAdminProfile(req, res);
});

router.put('/update-admin-password', (req, res) => {
    updateAdminPassword(req, res);
});

// Financial routes
const fetchFinancialData = require('../Functions/FinancialAdmin/FinancialFunctions/FetchFinancialData');
const FetchFinancialDataJobSeeker = require('../Functions/FinancialAdmin/FinancialFunctions/FetchFinancialDataJobSeeker');
const GetPaymetData = require('../Functions/FinancialAdmin/FinancialFunctions/GetPaymetData');
const getGroupedIncome = require('../Functions/FinancialAdmin/FinancialFunctions/GetGroupedIncome');
const getMonthlyIncome = require('../Functions/FinancialAdmin/FinancialFunctions/GetMonthlyIncome');
const GetMonthlyRevenue = require('../Functions/FinancialAdmin/FinancialFunctions/GetMonthlyRevenue');
const GetGroupedRevenue = require('../Functions/FinancialAdmin/FinancialFunctions/GetGroupedRevenue');

router.get('/getFinancialData', (req, res) => {
    fetchFinancialData(req, res);
});

router.get('/getFinancialDataJobSeeker', (req, res) => {
    FetchFinancialDataJobSeeker(req, res);
});

router.get('/paymentdata', (req, res) => {
    GetPaymetData(req, res);
});

router.get('/groupedincome', (req, res) => {
    getGroupedIncome(req, res);
});

router.get('/monthlyincome', (req, res) => {
    getMonthlyIncome(req, res);
});

router.get('/monthlyrevenue', (req, res) => {
    GetMonthlyRevenue(req, res);
});

router.get('/groupedrevenue', (req, res) => {
    GetGroupedRevenue(req, res);
});

module.exports = router;
