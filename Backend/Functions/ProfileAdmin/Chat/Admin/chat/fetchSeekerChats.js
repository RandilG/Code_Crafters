const { HttpStatusCode } = require("axios");
const connection = require("../../../../../Services/connection");

module.exports = async function fetchSeekerChats(req, res) {
  try {
    const query = "SELECT * FROM parttime_srilanka.seeker_message ORDER BY updatedTime DESC;";

    const chats = await queryAsync(query);
    
    if (chats.length === 0) return res.status(HttpStatusCode.Ok).json([]);

    const response = chats.map(chat => ({
      userName: chat.seeker,
      name: chat.seekerName,
      message: JSON.parse(chat.message)
    }));

    return res.status(HttpStatusCode.Ok).json(response);
  } catch (error) {
    console.error("Error fetching seeker chats:", error);
    return res
      .status(HttpStatusCode.InternalServerError)
      .json({ error: "Internal Server Error" });
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