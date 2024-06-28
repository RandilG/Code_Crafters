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
// const login = require('../Admin/login');
const adminRegister = require('../Functions/SuperAdmin/AdminRegister/register');
const FinancialAdminLogin = require('../Admin/FinancialAdminLogin/FinancialAdminLogin');
const ChangePassword = require('../Admin/ChangePassword/ChangePassword');
const resetPassword = require('../Admin/ResetPassword/ResetPassword');
const getFinancialAdmin = require('../Admin/GetFinancilAdmin/GetFinancilAdmin');
const updateFinancialAdmin = require('../Admin/UpdateFinancialAdmin/UpdateFinancialAdmin');
const updateAdminPassword = require('../Admin/UpdateAdminPassword/UpdateAdminPassword');

// router.post('/login', (req, res) => {
//     login(req, res);
// });

router.post('/register', (req, res) => {
    adminRegister(req, res);
});

router.post('/financial-admin-login', (req, res) => {
    FinancialAdminLogin(req, res);
});

router.post('/financial-admin-change-password', (req, res) => {
    ChangePassword(req, res);
});

router.post('/reset-password', (req, res) => {
    resetPassword(req, res);
});

router.get('/get-admin-data', (req, res) => {
    getFinancialAdmin(req, res);
});

router.put('/update-admin', (req, res) => {
    updateFinancialAdmin(req, res);
});

router.put('/update-admin-password', (req, res) => {
    updateAdminPassword(req, res);
});

// Financial routes
const fetchFinancialData = require('../Functions/FinancialAdmin/FetchFinancialData');
const FetchFinancialDataJobSeeker = require('../Functions/FinancialAdmin/FetchFinancialDataJobSeeker');
const GetPaymetData = require('../Functions/FinancialAdmin/GetPaymetData');
const getGroupedIncome = require('../Functions/FinancialAdmin/GetGroupedIncome');
const getMonthlyIncome = require('../Functions/FinancialAdmin/GetMonthlyIncome');
const GetMonthlyRevenue = require('../Functions/FinancialAdmin/GetMonthlyRevenue');
const GetGroupedRevenue = require('../Functions/FinancialAdmin/GetGroupedRevenue');

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
