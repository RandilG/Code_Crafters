const bcrypt = require('bcrypt');
const connection = require('../../../Services/connection'); // Adjust path as per your file structure

async function profileAdminLogin(req, res) {
    const { email, password } = req.body;

    try {
        const sql = "SELECT * FROM admins WHERE Email = ? AND AdminRole = 'Profile'";
        connection.query(sql, [email], async (err, result) => {
            if (err) {
                console.error("Error during login query:", err);
                return res.status(500).send("Internal server error.");
            }

            if (result.length === 0) {
                return res.status(401).send("Invalid credentials.");
            }

            const admin = result[0];
            if (admin.pasword_status === 'temperory') {
               if(admin.Password === password){
                  return res.status(309).send("Password must be changed.");
               }
           }else{
            const isPasswordCorrect = await bcrypt.compare(password, admin.Password);

            if (!isPasswordCorrect) {
                return res.status(401).send("Invalid credentials.");
            }
           }
            
            return res.status(200).json("Login successful.");
        });
    } catch (error) {
        console.error("Error in profileAdminLogin:", error);
        return res.status(500).send("Internal server error.");
    }
}

module.exports = profileAdminLogin;
