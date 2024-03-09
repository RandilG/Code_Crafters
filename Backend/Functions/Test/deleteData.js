const connection = require('./../../Services/connection');

module.exports = async function deleteData(req, res) {
    const iduser = req.query.iduser; 

    console.log(req.query.iduser);

    const deleteQuery = "DELETE FROM parttime_srilanka .job_poster WHERE JobPosterId= ?;";

    connection.query(deleteQuery, [iduser], (err, data) => {
        if (err) return res.json(err);
        return res.json("User deleted successfully");
    });
}