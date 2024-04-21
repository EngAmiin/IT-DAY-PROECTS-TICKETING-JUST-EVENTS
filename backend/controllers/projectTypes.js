
const dbConn = require("../connection/conn.config");

module.exports = {
  readAllProjectTypes: (req, res) => {
    try {
      var q =
        "SELECT projectType.id as value, projectType.type as label FROM projectType";
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
};