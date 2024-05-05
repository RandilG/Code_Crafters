const express = require('express')
const dotenv = require('dotenv')
const app = express();
const cors = require('cors');

dotenv.config()

app.use(express.json());
app.use(cors());

//import routes from routes.js 
const routes = require('./Routes/routes');

//configure route file
app.use('/', routes);

app.listen(process.env.PORT, () => {
    console.log("Server started in port: ", process.env.PORT)
})