const connection = require('./../../../Services/connection');

module.exports = async function rateSeeker(req, res) {
    const { id, seeker, job ,rate, review, deleted_status } = req.body;

    if (!seeker) {
        return res.status(400).json({ error: "Seeker is required" });
    }

    if (!job) {
        return res.status(400).json({ error: "Job is required" });
    }

    const query = `
        INSERT INTO seeker_ratings (id, seeker, job ,rate, review, deleted_status)
        VALUES (?, ?, ?, ?, ?, 0)
    `;

    connection.query(query, [id, seeker, job ,rate, review, deleted_status], (err, result) => {
        if (err) {
            console.error("Error saving the rating:", err);
            return res.status(500).json({ error: "An error occurred while saving the rating" });
        } else {
            res.json({ message: "Rating saved successfully" });
        }
    });
};
