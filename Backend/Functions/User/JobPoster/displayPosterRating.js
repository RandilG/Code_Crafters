// Controller function to fetch poster ratings
const connection = require('./../../../Services/connection');

module.exports = async function displayPosterRating(req, res) {
    const { poster } = req.params;

    const query = "SELECT seeker, rate, review FROM poster_ratings WHERE poster = ?";

    connection.query(query, [poster], (err, results) => {
        if (err) {
            console.error('Error fetching poster ratings:', err);
            res.status(500).json({ message: 'Error fetching poster ratings' });
            return;
        }
        console.log('Job poster ratings successfully retrieved:', results);
        res.json(results);
    });
};
