const express = require('express')
const router = express.Router()

const getData = require('../Functions/Test/getData')
const postData = require('../Functions/Test/postData')
const deleteData = require('../Functions/Test/deleteData')
const updateData = require('../Functions/Test/updateData')
const login = require('../Admin/SuperAdmin/login')
const adminRegister = require('./../Admin/SuperAdmin/register');
const emailverify = require('../Functions/otp/emailverification');
const fetchFinancialData = require('../Functions/FinancialAdmin/FetchFinancialData');
const FetchFinancialDataJobSeeker = require('../Functions/FinancialAdmin/FetchFinancialDataJobSeeker')
const GetPaymetData = require('../Functions/FinancialAdmin/GetPaymetData')
const getGroupedIncome = require('../Functions/FinancialAdmin/GetGroupedIncome')
const getMonthlyIncome = require('../Functions/FinancialAdmin/GetMonthlyIncome')
const GetMonthlyRevenue = require('../Functions/FinancialAdmin/GetMonthlyRevenue')
const GetGroupedRevenue = require('../Functions/FinancialAdmin/GetGroupedRevenue')


router.get('/getFinancialData', (req, res) => {
  fetchFinancialData(req, res);
})

router.get('/getFinancialDataJobSeeker', (req, res) => {
  FetchFinancialDataJobSeeker(req, res);
})

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

router.get('/paymentdata', (req, res)=>{
  GetPaymetData(req, res)
})

router.get('/groupedincome', (req, res)=>{
  getGroupedIncome(req,res)
})

router.get('/monthlyincome', (req, res)=>{
  getMonthlyIncome(req, res)
})

router.get ('/monthlyrevenue', (req, res)=>{
  GetMonthlyRevenue(req, res)
})

router.get('/groupedrevenue',(req, res)=>{
  GetGroupedRevenue(req, res)
})

module.exports = router