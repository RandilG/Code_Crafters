const connection = require('../Services/connection')


async function updateProfile(req, res){
    const sql = `UPDATE parttime_srilanka.admins SET FirstName = ?, LastName = ?, Email = ? WHERE (AdminId = ?);`

    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email
    const adminId = 1
    
    connection.query(sql, [firstName, lastName, email, adminId], (err, result)=>{
        if(err){
            console.log(err)
            return res.status(500).send("Internal Server Error")
        }else{
            return res.status(200).send("succesfully Updated")
        }
    })


    
}

module.exports = updateProfile