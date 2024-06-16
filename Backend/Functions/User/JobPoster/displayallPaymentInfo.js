const connection = require('../../../Services/connection');

module.exports = async function displayallPaymentInfo(req, res) {
  const query = `
    SELECT 
      id,
      amount,
      payment_date,
      payment_id,
      seeker_charge,
      service_charge,
      job_id
    FROM 
      payment
  `;

  connection.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ message: err.message });
      return;
    }
    res.status(200).json({ paymentInfo: results });
    console.log("Payment info retrived!")
  });
}
