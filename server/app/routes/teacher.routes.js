const { authJwt } = require("../middlewares");
const controller = require("../controllers/teacher.controller");
const { body } = require('express-validator');

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/teacher/:id", controller.getTeacherById);

  app.post("/api/teacher/all-subjects", controller.getAllSubjectsByTeacher);

  app.post("/api/teacher",
  body('name').notEmpty().withMessage('Name cannot be empty.'),  
  body('email').isEmail().withMessage('Email cannot be empty.'),   
    controller.createTeacher);

  app.put("/api/teacher/:id", controller.updateTeacher);

  app.delete("/api/teacher/:id",controller.deleteTeacher);

};
