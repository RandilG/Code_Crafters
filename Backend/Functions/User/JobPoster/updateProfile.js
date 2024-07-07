const connection = require('../../../Services/connection');

module.exports = async function updateJob(req, res) {
    const updateQuery = `
        UPDATE job_poster 
        SET 
            CompanyName = ?, 
            Address = ?, 
            city = ?, 
            FirstName = ?, 
            LastName = ?
        WHERE EmailAddress = ?;
    `;

    const values = [
        req.body.CompanyName,
        req.body.Address,
        req.body.city,
        req.body.FirstName,
        req.body.LastName,
        req.params.id
    ];

    console.log('Update values:', values); // Log values to check

    connection.query(updateQuery, values, (err, data) => {
        if (err) {
            console.error('Error updating profile:', err);
            return res.status(500).json({ error: 'Error updating profile' });
        }
        console.log("Profile updated successfully");
        return res.status(200).json({ message: "Profile updated successfully" });
    });
};
