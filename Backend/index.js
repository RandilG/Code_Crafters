const express = require('express')
const dotenv = require('dotenv')
const app = express();
const cors = require('cors');

dotenv.config()

app.use(express.json());
app.use(cors());

const routes = require('./Routes/routes');

app.use('/', routes);

app.listen(process.env.PORT, () => {
    console.log("Server started in port: ", process.env.PORT)
})