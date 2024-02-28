const express=require('express')  //express directory
const dotenv=require('dotenv')


//dot env config
dotenv.config()

const app=express();

app.use(express.json()) //parse JSON bodies (as sent by API)

const routes=require('./Routes/routes')

app.use('/',routes) // define routes

app.listen(process.env.PORT,()=>{
    console.log("Server started in port:",process.env.PORT)
})  //assign the port