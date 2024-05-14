const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { HttpStatusCode } = require('axios');

dotenv.config();

module.exports = async function auth(req, res) {
    const { token, userName } = req.params;
    jwt.verify(token, process.env.SECRET_KEY, function (err, decode) {
        try {
            if (err)  return res.json(HttpStatusCode.Unauthorized);
            if (decode.userName === userName) return res.json(HttpStatusCode.Accepted);
            return res.json(HttpStatusCode.Unauthorized);
        } catch (error) {
            return res.json(HttpStatusCode.InternalServerError)
        }
    });
}