const connection = require('./../../../Services/connection');

module.exports = async function displayProfileInfo(req, res) {
  const query = "SELECT CompanyName, Address, TpNumber FROM parttime_srilanka.job_poster WHERE EmailAddress = ?";
  const EmailAddress = req.params.EmailAddress;  // Get EmailAddress from the request parameters

  // Log the EmailAddress to verify it's correct
  console.log(`Received request for email address: ${EmailAddress}`);

  connection.query(query, [EmailAddress], (err, results) => {
    if (err) {
      // Log the error and send a response
      console.error(`Database query error: ${err.message}`);
      res.status(500).json({ message: err.message });
      return;
    }
    if (results.length === 0) {
      // Log the case when no results are found
      console.log('Job poster not found for the provided email address.');
      res.status(404).json({ message: 'Job poster not found' });
      return;
    }
    res.json(results[0]);
    console.log("Job poster data retrieved:", results[0]);
  });
};
