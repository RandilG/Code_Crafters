const express = require('express')
const dotenv = require('dotenv')
const app = express();

dotenv.config()

app.use(express.json());

const routes = require('./Routes/routes');

app.use('/', routes);

app.listen(process.env.PORT, () => {
    console.log("Server started in port: ", process.env.PORT)
})