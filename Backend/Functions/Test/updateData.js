const connection = require('./../../Services/connection');

module.exports = async function updateData(req, res) {

    const updateQuery = "UPDATE parttime_srilanka . job_poster SET UserName = ?, CompanyName = ?, Addresss = ?, TpNumber = ?, EmailAddress = ?, Password = ? WHERE JobPosterID = ?;";

    // console.log(iduser)

    const values = [
        req.body.UserName,
        req.body.CompanyName,
        req.body.Addresss,
        req.body.TpNumber,
        req.body.EmailAddress,
        req.body.Password,
        req.body.JobPosterID
    ];

    connection.query(updateQuery, values, (err, data) => {
        if (err) return res.json(err);
        return res.json("User updated successfully");
    });
}