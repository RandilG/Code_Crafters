const express=require('express')

//router object
const router=express.Router()

const getData=require('../Functions/Test/getData')
const postData=require('../Functions/Test/postData')
const deleteData = require('../Functions/Test/deleteData')
const updateData = require('../Functions/Test/updateData')
const login = require('../Functions/User/JobPoster/login')
const register = require('../Functions/User/JobPoster/register')

router.get('/getData',(req,res)=>{
    getData(req,res)
})// connect index and getData

router.post('/addData',(req,res)=>{
    postData(req,res)
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

router.post('/register', (req, res) => {
     register(req, res)
    });

module.exports=router