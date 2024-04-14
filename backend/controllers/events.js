const dbConn = require('../connection/conn.config');



module.exports = {

  readEvents: (req, res) => {
    try {
      var q =
        "SELECT Events.eventName as label, Events.id as value from Events ORDER BY Events.year DESC";
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
  readAllProjects: (req, res) => {
    try {
      var q =
        "SELECT students.id_card,projects.ProjectName as Project, students.FullName from students join projects on students.id=projects.student";
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
  projectsByEvent: (req, res,next) => {
    try {
    
      var q =
        "SELECT students.id_card,projects.ProjectName as Project, students.FullName from students join projects on students.id=projects.student where projects.event=?";
      dbConn.query(q, [req.params.id],(err, result) => {
        
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
  }
};