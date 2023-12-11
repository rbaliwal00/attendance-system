const { authJwt } = require("../middlewares");
const controller = require("../controllers/class.controller");
const { query, body} = require('express-validator');

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/classes", controller.getAllClasses);

  app.get("/api/class/:id", controller.getClassById);

  app.post("/api/class",
    body('class_name').notEmpty().withMessage('Class Name cannot be empty.'),   
    controller.createClass);

  app.put("/api/class/:id", controller.updateClass);

  app.delete("/api/class/:id",controller.deleteClass);

};
