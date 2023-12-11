const { authJwt } = require("../middlewares");
const controller = require("../controllers/subject.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/subject", controller.getAllSubjects);
  app.get("/api/subject/:subjectId", controller.getSubjectById);
  app.post("/api/subject", controller.addSubject);
  app.put("/api/subject/:id", controller.updatedSubject);
  app.delete("/api/subject/:id", controller.deleteSubjectById);
  app.delete("/api/subject", controller.deleteAttendance);
  app.put("/api/attendance/add-attendance/:id", controller.addAttendance);
  app.post("/api/attendance/range-attendance", controller.rangeAttendance);
};
