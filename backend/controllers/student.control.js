const dbConn = require('../connection/conn.config');



module.exports={
    registerStudent: (req,res)=>{
      try{
          var q = "INSERT INTO students(FullName,mobile,email,password,id_card,semester) VALUES(?,?,?,?,?,?)"
        const {name,mobile,email,password,id_card,semester}=req.body
        dbConn.query(q,[name,mobile,email,password,id_card,semester],(err,result)=>{
            if (err)
            return res.status(500).json({message: "Account Not Registered",description: err.message})
            
            return res.status(200).json({message: "Your account has been Created"})
        })
      }catch(err) {
        return res.status(500).json("Internal Server Error, Try Again");
      }
    }
}