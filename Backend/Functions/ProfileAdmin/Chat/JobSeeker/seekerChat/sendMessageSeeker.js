const { HttpStatusCode } = require("axios");
const connection = require("../../../../../Services/connection");
const moment = require("moment");

module.exports = async function sendMessageSeeker(req, res) {
  console.log(req.body)
  try {
    const { userName, name, role, message } = req.body;

    const query1 =
      "SELECT * FROM parttime_srilanka.seeker_message WHERE seeker = ?;";
    const query2 =
      "INSERT INTO parttime_srilanka.seeker_message (seeker, seekerName, message, updatedTime) VALUES (?, ?, ?, ?);";
    const query3 =
      "UPDATE `parttime_srilanka`.`seeker_message` SET `message` = ? , `updatedTime` = ? WHERE (seeker = ?);";

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

    req.app.get("io").to(userName).emit("seekerChatStarted", response);

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

    return res.status(200).json("Send message from seeker");
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
