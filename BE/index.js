const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const routes = require("./Routes/routes");
const connection = require('./Services/connection');

dotenv.config();

const app = express();

app.use(cors({
    origin: "http://localhost:3000",
}));

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());



app.use(routes);

app.listen(process.env.PORT, () => {
    console.log("Server is running on port " + process.env.PORT);
});
