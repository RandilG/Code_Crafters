const { HttpStatusCode } = require("axios");
const connection = require("../../../../../Services/connection");
const moment = require("moment");

module.exports = async function sendMessagePoster(req, res) {
  console.log(req.body)
  try {
    const { userName, name, role, message } = req.body;

    const query1 =
      "SELECT * FROM parttime_srilanka.poster_message WHERE poster = ?;";
    const query2 =
      "INSERT INTO `parttime_srilanka`.`poster_message` (poster, posterName, message, updatedTime) VALUES (?, ?, ?, ?);";
    const query3 =
      " UPDATE `parttime_srilanka`.`poster_message` SET `message` = ? , `updatedTime` = ? WHERE (poster = ?);";

    const currentDate = new Date();

    const response = {
      userName: userName,
      name: name,
      message: [
        {
          timeStamp:
            moment(currentDate).format("YYYY/MM/DD") +
            " " +
            moment(currentDate).format("LT"),
          role: role,
          message: message,
        },
      ],
    };

    const io = req.app.get('io');
    if (io) {
      io.to(userName).emit("posterChatStarted", response);
    } else {
      console.error('Socket.io instance not found');
    }

    let resp = await queryAsync(query1, userName);

    if (resp.length == 0) {
      const values = [
        userName,
        name,
        JSON.stringify(response.message),
        currentDate,
      ];
      await queryAsync(query2, values);
    } else {
      const messages = JSON.parse(resp[0].message);
      messages.push(response.message[0]);
      const message = JSON.stringify(messages);
      await queryAsync(query3, [message, currentDate, userName]);
    }

    return res.status(200).json("Send message from poster");
  } catch (error) {
    console.error(error);
    return res.status(500).json("Internal Server Error");
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