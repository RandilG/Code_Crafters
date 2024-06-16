const connection = require('./../../../Services/connection');

module.exports = async function getPaymentInfo(req, res) {
  //const { id } = req.query;

  /*if (!id) {
    res.status(400).json({ message: 'Payment ID is required' });
    return;
  }*/

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
    WHERE 
      id = ?
  `;
  const id = req.params.id;  // Get id from the request parameters

  connection.query(query, [req.params.id], (err, results) => {
    if (err) {
      res.status(500).json({ message: err.message });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ message: 'Payment not found' });
      return;
    }
    res.json(results[0]);
    console.log("Payment Data retrived!")
  });
}
