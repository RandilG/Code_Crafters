const express = require('express');
const dotenv = require('dotenv');
const http = require('http');
const cors = require('cors');
const initializeSocket = require('./Functions/ProfileAdmin/Chat/common/socket/socket'); 
const routes = require('./Routes/routes');

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*'
}));

const io = initializeSocket(server);
app.set('io', io);  // Add this line

app.use('/', routes);

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});