const connection = require('../../../Services/connection');

module.exports = async function updateProfilePicture(req, res) {
    const { profilePic, EmailAddress } = req.body;

    // Log the received data
    console.log('Received profilePic:', profilePic);
    console.log('Received EmailAddress:', EmailAddress);

    // Fetch and log existing email addresses
    const fetchEmailsSql = 'SELECT EmailAddress FROM job_poster';
    connection.query(fetchEmailsSql, (err, emailResults) => {
        if (err) {
            console.error('Error fetching emails:', err);
            res.status(500).json({ message: 'Error fetching emails' });
            return;
        }

        const existingEmails = emailResults.map(row => row.EmailAddress);
        console.log('Existing emails:', existingEmails);

        const updateSql = `
            UPDATE job_poster
            SET profilePic = ?
            WHERE EmailAddress = ?
        `;

        connection.query(updateSql, [profilePic, EmailAddress], (err, results) => {
            if (err) {
                console.error('Error updating profile picture:', err);
                res.status(500).json({ message: err.message });
                return;
            }

            console.log('Query results:', results);

            if (results.affectedRows === 0) {
                console.log('No rows updated. Please check the EmailAddress.');
                res.status(404).json({ message: 'EmailAddress not found' });
                return;
            }

            console.log('ProfilePic updated successfully!');
            res.status(200).json({ message: 'ProfilePic updated successfully', result: results });
        });
    });
};
