const connection = require('./../../../Services/connection');

module.exports = async function displayallJob(req, res) {
  const query = "SELECT * FROM parttime_srilanka.job";

  connection.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ message: err.message });
      return;
    }
    console.log('Data successfully retrived!');
    res.json(results);
  });
};
