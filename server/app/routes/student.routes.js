const { authJwt } = require("../middlewares");
const controller = require("../controllers/student.controller");
const { query, body } = require('express-validator');

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/students", controller.getAllStudents);
  app.get("/api/student/subjects/:rollNo", controller.getAllSubjectByStudentId);
  app.get("/api/student/:id", controller.getStudentById);

  app.post("/api/student",
  body('roll_no').notEmpty().withMessage('Roll Number cannot be empty.'),  
  body('name').notEmpty().withMessage('Name cannot be empty.'),  
  body('father_name').notEmpty().withMessage('Father Name cannot be empty.'),   
    controller.createStudent);

  app.put("/api/student/:id", controller.updateStudent);


  app.delete("/api/student/:id",controller.deleteStudent);

};
