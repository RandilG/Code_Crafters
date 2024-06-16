const connection = require('./../../../Services/connection');

module.exports = async function updateJob(req, res) {

    const updateQuery = "UPDATE parttime_srilanka . job SET title = ?, job_date = ?, start_time = ?, amount_of_seekers = ?, work_hours = ?, hourly_rate = ?, latitude = ?, longitude = ?, gender = ?, description = ? WHERE job_id = ?;";

    // console.log(iduser)

    const values = [
        req.body.title,
        req.body.job_date,
        req.body.start_time,
        req.body.amount_of_seekers,
        req.body.work_hours,
        req.body.hourly_rate,
        req.body.latitude,
        req.body.longitude,
        req.body.gender,
        req.body.description,
        req.params.id
    ];

    connection.query(updateQuery, values, (err, data) => {
        if (err) return res.json(err);
        return res.json("Job updated successfully");
    });
}