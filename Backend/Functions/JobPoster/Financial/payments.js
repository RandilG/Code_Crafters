//insert new job to job table
//update temporary job table
//insert payment table to payment detail 

const connection = require("../../../Services/connection");
const dotenv = require("dotenv");
const moment = require("moment");
const { HttpStatusCode } = require("axios");

dotenv.config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports = async function payments(req, res) {
  const { amount, payment_id, seeker_charge, service_charge } = req.body;
  try {

    //select tempory jobs
    const query1 = "SELECT * FROM parttime_srilanka.temporary_job WHERE tempory_job_id=?;";

    // insert paid jobs
    const query2 = "INSERT INTO `parttime_srilanka`.`job` (`job_id`, `posted_date`, `job_date`, `amount_of_seekers`, `work_hours`, `hourly_rate`, `status`, `title`, `job_poster`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

    // insert payment detail in to the payment table
    const query3 = "INSERT INTO `parttime_srilanka`.`payment` (`amount`, `payment_date`, `payment_id`, `seeker_charge`, `service_charge`, `job_id`) VALUES (?, ?, ?, ?, ?, ?);";

    // delete relevant data from the tempory job table
    const query4 = "DELETE FROM `parttime_srilanka`.`temporary_job` WHERE (`tempory_job_id` = ?);";

    const date = moment().format("YYYY-MM-DD");

    let values = [req.params.tempJobId];

    await queryAsync("START TRANSACTION");  // start the transaction

    let data = await queryAsync(query1, values);

    values = [
      data[0].tempory_job_id,
      data[0].posted_date,
      data[0].job_date,
      data[0].amount_of_seekers,
      data[0].work_hours,
      data[0].hourly_rate,
      "new",
      data[0].title,
      data[0].job_poster,
    ];

    await queryAsync(query2, values);

    values = [
      amount,
      date,
      payment_id,
      seeker_charge,
      service_charge,
      req.params.tempJobId,
    ];

    await queryAsync(query3, values);

    await queryAsync(query4, [req.params.tempJobId]);

    await queryAsync("COMMIT"); // commit the transaction to the DB

    return res.status(HttpStatusCode.Ok).json("Transaction successfully completed");
  } catch (error) {
    await queryAsync("ROLLBACK"); // if error happen,recover the transaction
    const refund = await stripe.refunds.create({
      payment_intent: payment_id,
    }); 
    console.log(refund);
    // console.log(error);
    return res.status(HttpStatusCode.InternalServerError).json("Internal Server Error");
  }
};

// Helper function to wrap connection.query in a promise
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
