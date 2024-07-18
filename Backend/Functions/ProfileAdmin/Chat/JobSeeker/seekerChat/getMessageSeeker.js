const {HttpStatusCode } = require('axios');
const connection = require("../../../../../Services/connection");

module.exports = async function getMessageSeeker(req, res) {

  try {

    const query = "SELECT * FROM parttime_srilanka.seeker_message WHERE seeker = ?;"
    const value = [req.params.jobSeeker];

    const chat = await queryAsync(query, value);
    const response = [];

    if (chat.length == 0) {
      return res.status(HttpStatusCode.Ok).json(response);
    }

    const respObj = {
      userName: "",
      name: "",
      message: [],
    };

    respObj.userName = chat[0].seeker;
    respObj.name = chat[0].seekerName;
    respObj.message = JSON.parse(chat[0].message);

    response.push(respObj);

    return res.status(HttpStatusCode.Ok).json(response);

  } catch (error) {
    console.error(error);
    return res.status(HttpStatusCode.InternalServerError).json("Internal Server Error");
  }
};

function queryAsync(query, values) {
  return new Promise((resolve, reject) => {
    connection.query(query, values, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}