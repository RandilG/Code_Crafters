const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');
const initializeSocket = require('./Functions/Common/socket/socket');

dotenv.config()

const app = express();
app.use(express.json());
app.use(cors());

const server = http.createServer(app);

//Socket configuration
const io = initializeSocket(server);

app.set('io', io)


const routes = require('./Routes/routes');
app.use('/', routes);


server.listen(process.env.PORT, () => {
    console.log("Server started in port: ", process.env.PORT)
});