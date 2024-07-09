const { HttpStatusCode } = require("axios");
const connection = require("../../../Services/connection");

module.exports = async function fetchPosterChats(req, res) {
  try {
    const query = "SELECT * FROM parttime_srilanka.poster_message ORDER BY updatedTime DESC;";

    const chats = await queryAsync(query);
    const response = [];

    console.log(chats);

    if (chats.length == 0) return res.status(HttpStatusCode.Ok).json(response);

    for (const chat of chats) {
      const respObj = {
        userName: "",
        name: "",
        message: [],
      };

      respObj.userName = chat.poster;
      respObj.name = chat.posterName;
      respObj.message = JSON.parse(chat.message);

      response.push(respObj);
    }

    return res.status(HttpStatusCode.Ok).json(response);
  } catch (error) {
    console.error(error);
    return res
      .status(HttpStatusCode.InternalServerError)
      .json("Internal Server Error");
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
