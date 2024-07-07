const connection = require('./../../../Services/connection');

module.exports = async function updateJob(req, res) {
    const updateQuery = `
        UPDATE temporary_job 
        SET 
            title = ?, 
            job_date = ?, 
            amount_of_seekers = ?, 
            work_hours = ?, 
            hourly_rate = ?
        WHERE tempory_job_id = ?;
    `;

    const values = [
        req.body.title,
        req.body.job_date,
        req.body.amount_of_seekers,
        req.body.work_hours,
        req.body.hourly_rate,
        req.params.id
    ];

    console.log('Update values:', values); // Log values to check

    // Backend (updateJob.js)
connection.query(updateQuery, values, (err, data) => {
    if (err) {
        console.error('Error updating job:', err);
        return res.status(500).json({ error: 'Error updating job' });
    }
    console.log("Job updated successfully");
    return res.status(200).json({ message: "Job updated successfully" });
});

};
