const connection=require('./../../Services/connection')

module.exports=async function postData(req,res){

    const genarate="INSERT INTO `parttime_srilanka`.`job_poster` (`UserName`, `CompanyName`, `Addresss`,`TpNumber`, `EmailAddress`, `Password`) VALUES (?, ?, ?, ?, ?, ?);"

    const values=[
        req.body.UserName,
        req.body.CompanyName,
        req.body.Addresss,
        req.body.TpNumber,
        req.body.EmailAddress,
        req.body.Password
    ]

    connection.query(genarate,values,(err,data)=>{
        if(err) return res.json(err)
        return res.json("User registered successfully!")
    })

}