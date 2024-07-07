const connection = require('./../../../Services/connection');

module.exports = async function rateSeeker(req, res) {
  const { seeker, rate, review, posterEmail, jobId } = req.body;

  console.log('Received data:', req.body); // Log the incoming request data

  // Query to get poster ID from email
  const getPosterQuery = `SELECT JobPosterID FROM job_poster WHERE EmailAddress = ?`;

  connection.query(getPosterQuery, [posterEmail], (err, result) => {
    if (err) {
      console.error("Error fetching poster ID:", err);
      return res.status(500).json({ error: "An error occurred while fetching poster ID" });
    }

    if (result.length === 0) {
      console.error("No job poster found with the provided email");
      return res.status(404).json({ error: "No job poster found with the provided email" });
    }

    const posterId = result[0].JobPosterID; // Ensure the correct capitalization

    const insertRatingQuery = `
      INSERT INTO seeker_ratings (seeker, rate, review, poster, job, deleted_status)
      VALUES (?, ?, ?, ?, ?, 0)
    `;

    connection.query(insertRatingQuery, [seeker, rate, review, posterId, jobId], (err, result) => {
      if (err) {
        console.error("Error saving the rating:", err);
        return res.status(500).json({ error: "An error occurred while saving the rating" });
      } else {
        console.log("Rating saved successfully");
        res.json({ message: "Rating saved successfully" });
      }
    });
  });
};
