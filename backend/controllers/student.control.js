const dbConn = require('../connection/conn.config');



module.exports = {
  setupProject: (req, res) => {
    try {
      var q =
        "INSERT INTO projects(ProjectName,type,event,tech,student) VALUES(?,?,?,?,?)";
      const { project, type, event, tech, studentId } = req.body;
      dbConn.query(
        q,
        [project, parseInt(type), parseInt(event), tech, parseInt(studentId)],
        (err, result) => {
          if (err)
            return res.status(500).json({
              message: "Account Not Registered",
              description: err.message,
            });

          return res.status(200).json({
            message: "Project Has Been Successfully Submitted",
            result: result,
          });
        }
      );
    } catch (err) {
      return res.status(500).json("Internal Server Error, Try Again");
    }
  },
  registerStudent: (req, res) => {
    try {
      var q =
        "INSERT INTO students(FullName,mobile,email,password,id_card,semester) VALUES(?,?,?,?,?,?)";
      const { name, mobile, email, password, id_card, semester } = req.body;
      dbConn.query(
        q,
        [name, mobile, email, password, id_card, semester],
        (err, result) => {
          if (err)
            return res.status(500).json({
              message: "Account Not Registered",
              description: err.message,
            });

          return res
            .status(200)
            .json({ message: "Your account has been Created", result: result });
        }
      );
    } catch (err) {
      return res.status(500).json("Internal Server Error, Try Again");
    }
  },
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
  readProjectsForUsers: (req, res) => {
    try {
      var q =
        "SELECT projects.id,projects.ProjectName, projectType.type,projects.status FROM `projects` join projectType on projects.type=projectType.id WHERE projects.student=? ORDER BY created_at DESC";
      const { id } = req.params;
      dbConn.query(q, [id], (err, result) => {
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
  readTypes: (req, res) => {
    try {
      var q = "SELECT * FROM `projectType`";
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
  removeProject: (req, res) => {
    try {
      var q =
        "DELETE FROM projects where projects.id=? and projects.student=?";
      const { projectId,studentId } = req.params;
      dbConn.query(q, [projectId,studentId], (err, result) => {
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