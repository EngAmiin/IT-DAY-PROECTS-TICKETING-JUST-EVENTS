const dbConn = require("../connection/conn.config");

module.exports = {
  createMessage: (req, res) => {
    try {
      var q =
        "INSERT INTO messages(name,class,message) VALUES(?,?,?)";
      dbConn.query(q,[req.body.name,req.body.className,req.body.message], (err, result) => {
        if (err)
          return res.status(500).json({
            message: "Error",
            description: err.message,
          });

        return res.status(200).json({ data: result });
      });
    } catch (err) {
      return res.status(500).json("Internal Server Error, Try Again");
    }
  },

};
