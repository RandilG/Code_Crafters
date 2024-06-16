const connection = require('./../../../Services/connection');

module.exports = async function deleteJob(req, res) {

    const sql = 'DELETE FROM job WHERE job_id = ?';

    connection.query(sql, [req.params.id], (err, results) => {
        if (err) {
          console.log(err)
          res.status(500).json({ message: err.message });
          return;
        }
        if (results.affectedRows === 0) {
          res.status(404).json({ message: 'Job not found' });
          return;
        }
        res.json({ message: 'Job deleted' });
      });
}
