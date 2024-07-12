const connection = require('./../../../Services/connection');

module.exports = function displayCalRating(req, res) {
    // Log the entire request object to debug
    console.log('Request Object:', req);

    const { poster } = req.query;

    // Log the poster parameter to debug
    console.log('Poster:', poster);

    const query = `
        SELECT SUM(rate) AS totalRate, COUNT(*) AS numberOfRatings
        FROM poster_ratings
        WHERE poster = ? AND deleted_status = 0
    `;
    
    connection.query(query, [poster], (err, results) => {
        if (err) {
            console.error('Database error:', err.message);
            res.status(500).json({ message: err.message });
            return;
        }
        console.log('Query Results:', results);
        res.json(results);
    });
};
