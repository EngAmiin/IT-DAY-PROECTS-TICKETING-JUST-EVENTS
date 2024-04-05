const dbConn = require('../connection/conn.config');



module.exports={
    registerStudent: (req,res)=>{
      try{
          var q = "INSERT INTO students(FullName,mobile,email,password,id_card,semester) VALUES(?,?,?,?,?,?)"
        const {name,mobile,email,password,id_card,semester}=req.body
        dbConn.query(q,[name,mobile,email,password,id_card,semester],(err,result)=>{
            if (err)
            return res.status(500).json({message: "Account Not Registered",description: err.message})
            
            return res.status(200).json({message: "Your account has been Created",result :result})
        })
      }catch(err) {
        return res.status(500).json("Internal Server Error, Try Again");
      }
    },
    authenticate: (req,res)=>{
      try{
          var q = "SELECT *FROM students where id_card=? and password=?"
        const { id_card, password } = req.params;
        dbConn.query(q, [id_card, password], (err, result) => {
          if (err)
            return res
              .status(500)
              .json({
                message: "Error",
                description: err.message,
              });

          return res
            .status(200)
            .json({ message: "Login successfully", data: result });
        });
      }catch(err) {
        return res.status(500).json("Internal Server Error, Try Again");
      }
    }
}