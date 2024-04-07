const dbConn = require('../connection/conn.config');



module.exports = {
  authenticate: (req, res) => {
    try {
      var q = "SELECT *FROM students where id_card=? and password=?";
      const { id_card, password } = req.params;
      dbConn.query(q, [id_card, password], (err, result) => {
        if (err)
          return res.status(500).json({
            message: "Error",
            description: err.message,
          });

        return res
          .status(200)
          .json({ message: "Login successfully", data: result });
      });
    } catch (err) {
      return res.status(500).json("Internal Server Error, Try Again");
    }
  },

  readUsers: (req, res) => {
    try {
      var q = "SELECT * FROM `users`";
      dbConn.query(q, (err, result) => {
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
  readStudents: (req, res) => {
    try {
      var q = "SELECT * FROM `students`";
      dbConn.query(q, (err, result) => {
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
  findUser: (req, res) => {
    try {
      var q = "SELECT * FROM `users` where username=? and password=?";
      dbConn.query(q,[req.params.username,req.params.password], (err, result) => {
        if (err)
          return res.status(500).json({
            message: "Error",
            description: err.message,
          });

        return res.status(200).json({ message : "Hello",data: result });
      });
    } catch (err) {
      return res.status(500).json("Internal Server Error, Try Again");
    }
  },
  removeUser: (req, res) => {
    try {
      var q = "DELETE FROM users where uid=?";
      const { uid } = req.params;
      dbConn.query(q, [uid], (err, result) => {
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