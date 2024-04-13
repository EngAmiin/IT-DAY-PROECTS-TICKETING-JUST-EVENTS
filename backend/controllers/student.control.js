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
        "INSERT INTO students(FullName,mobile,email,password,id_card,semester,event) VALUES(?,?,?,?,?,?,?)";
      const { name, mobile, email, password, id_card, semester, event } =
        req.body;
      dbConn.query(
        q,
        [name, mobile, email, password, id_card, semester, event],
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
  fetchStudentRangeByEvent: (req, res) => {
    try {
      var q = "CALL sp_getCorumEvent(?)";
      const { id } = req.params;
      dbConn.query(q, [id], (err, result) => {
        if (err)
          return res.status(500).json({
            message: "Error",
            description: err.message,
          });

        return res.status(200).json({ data: result[0] });
      });
    } catch (err) {
      return res.status(500).json("Internal Server Error, Try Again");
    }
  },
  fetchCurrentStudentsByEvent: (req, res) => {
    try {
      var q = "CALL `getEventStudents`();";
      dbConn.query(q, (err, result) => {
        if (err)
          return res.status(500).json({
            message: "Error",
            description: err.message,
          });

        return res.status(200).json({ data: result[0] });
      });
    } catch (err) {
      return res.status(500).json("Internal Server Error, Try Again");
    }
  },
  fetchEventReport: (req, res) => {
    try {
      var q = "CALL `event_report`();";
      dbConn.query(q, (err, result) => {
        if (err)
          return res.status(500).json({
            message: "Error",
            description: err.message,
          });

        return res.status(200).json({ data: result[0] });
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
  readProjectsForAdmins: (req, res) => {
    try {
      var q = "SELECT *from _views_students_project";
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
  updateStatus: (req, res) => {
    try {
      var q = "UPDATE projects set status=? where id=? and student=?";
      dbConn.query(
        q,
        [req.body.status, req.body.pId, req.body.stdId],
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
  readSemesters: (req, res) => {
    try {
      var q = "SELECT * FROM `semesters`";
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
      var q = "DELETE FROM projects where projects.id=? and projects.student=?";
      const { projectId, studentId } = req.params;
      dbConn.query(q, [projectId, studentId], (err, result) => {
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

  readActiveEvent: (req, res) => {
    try {
      var q =
        "SELECT id,eventName as event FROM `Events` WHERE status='active'ORDER BY year DESC LIMIT 1";
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
  readCurrentUser: (req, res) => {
    try {
      var q = "SELECT * FROM `students` WHERE id=?";
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
  updateProfile: (req, res) => {
    try {
      if(req.body.type=="data"){
  var q = "UPDATE`students` set email=?, mobile=? WHERE id=?";
  dbConn.query(
    q,
    [req.body.email, req.body.mobile, req.body.id],
    (err, result) => {
      if (err)
        return res.status(500).json({
          message: "Error",
          description: err.message,
        });

      return res.status(200).json({ type: "data", data: result });
    }
  );
      }else{
          var q = "UPDATE`students` set password=? WHERE id=?";
          dbConn.query(
            q,
            [req.body.newPass,  req.body.id],
            (err, result) => {
              if (err)
                return res.status(500).json({
                  message: "Error",
                  description: err.message,
                });

              return res.status(200).json({ type: "privacy", data: result });
            }
          );
      }
    
    } catch (err) {
      return res.status(500).json("Internal Server Error, Try Again");
    }
  },
  geCurrentPassword: (req, res) => {
    try {
      var q = "SELECT id,password FROM `students` WHERE id=?";
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
  fetchProjectsByType: (req, res) => {
    try {
      var q = "SELECT projectType.type as label, COUNT(projects.id) as value from projectType join projects ON projectType.id=projects.type WHERE projects.event in (SELECT Events.id from Events WHERE Events.status='Active' ORDER BY Events.year) group by projectType.type";
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