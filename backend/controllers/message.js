const dbConn = require("../connection/conn.config");

module.exports = {
  createMessage: (req, res) => {
    try {
      var q = "INSERT INTO messages(name,class,message) VALUES(?,?,?)";
      dbConn.query(
        q,
        [req.body.name, req.body.className, req.body.message],
        (err, result) => {
          if (err)
            return res.status(500).json({
              message: "Error",
              description: err.message,
            });

          return res.status(200).json({ data: result });
        }
      );
    } catch (err) {
      return res.status(500).json("Internal Server Error, Try Again");
    }
  },
  readMessages: (req, res) => {
    try {
      var q = "SELECT * FROM messages";
      dbConn.query(q, (err, result) => {
        if (err)
          return res.status(500).json({
            message: "Error",
            description: err.message,
          });

        return res.status(200).json(result);
      });
    } catch (err) {
      return res.status(500).json("Internal Server Error, Try Again");
    }
  },
  deleteMessage: (req, res) => {
    try {
      var q = "DELETE FROM  messages WHERE id =?";
      dbConn.query(q, [req.params.id], (err, result) => {
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
