const connection=require('./../../Services/connection')

module.exports=async function getData(req,res){

    const query="SELECT * FROM parttime_srilanka . job_poster WHERE UserName = ?;"

    const value = req.query.UserName

    connection.query(query,(value),(err,data)=>{
        if(err){
            return res.json(err)
        }else if(data.length==0){
            console.log(data)
            return res.json("User not found!")
        }else{
            return res.json(data[0])
        }
    })
}
