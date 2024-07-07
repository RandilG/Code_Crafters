const express=require('express')  //express directory
const dotenv=require('dotenv')
const cors = require('cors');


//dot env config
dotenv.config()

const app=express();

app.use(express.json()) //parse JSON bodies (as sent by API)
app.use(cors());

const routes=require('./Routes/routes')

app.use('/',routes) // define routes

app.listen(process.env.PORT,()=>{
    console.log("Server started in port:",process.env.PORT)
})  //assign the port