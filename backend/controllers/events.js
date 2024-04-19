const dbConn = require('../connection/conn.config');
const convertDatetimeToDate = require('../utils/fun.utils')



module.exports = {
  checkRegistrationDueDate: (req, res) => {
    try {
      var q =
        "SELECT to_register from Events where Events.status ='Active' ORDER BY Events.year LIMIT 1;";
      dbConn.query(q, (err, result) => {
        if (err)
          return res.status(500).json({
            message: "Error",
            description: err.message,
          });
     
        const {to_register}=result[0];
        const dueDate = convertDatetimeToDate(to_register);
        const todaysDate = convertDatetimeToDate(new Date());
           console.log(dueDate, todaysDate);
        return res
          .status(200)
          .json({ hasReachedDueDate: dueDate === todaysDate });
      });
    } catch (err) {
      return res.status(500).json("Internal Server Error, Try Again");
    }
  },
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
  readAllEvents: (req, res) => {
    try {
      var q =
        "SELECT * from Events ORDER BY Events.year DESC";
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
  createEvent: (req, res) => {
    try {
      var q =
        "INSERT INTO `Events`(`eventName`, `year`, `from_register`, `to_register`, `due_date`, `no_students`, `status`) VALUES (?,?,?,?,?,?,?)";
      dbConn.query(q,[req.body.event,req.body.year,req.body.from_reg,req.body.to_reg,
      req.body.start_date,req.body.num_students,req.body.status], (err, result) => {
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
  updateEventStatus: (req, res) => {
    try {
      var q =
        "CALL updateEventStatus(?,?)";
      dbConn.query(q,[req.body.id,req.body.status], (err, result) => {
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
  projectsByEvent: (req, res, next) => {
    try {
      var q =
        "SELECT students.id_card,projects.ProjectName as Project, students.FullName from students join projects on students.id=projects.student where projects.event=?";
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