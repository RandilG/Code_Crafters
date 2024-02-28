const mysql = require('mysql')
const dotenv=require('dotenv')

dotenv.config()

const connection = mysql.createConnection({
    host:process.env.HOST_NAME,
    user:process.env.USER_NAME,
    password:process.env.PASSWORD,
    port:process.env.DB_PORT,
    database:process.env.DB
})


connection.connect(function(err){
    if(err) throw err
    console.log("Connected to the database");
})

module.exports=connection