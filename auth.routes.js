const verifySignUp = require("./middleware/verifySignUp");
const userController = require("./userController");
var jwt = require("jsonwebtoken");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
  
    app.post(
      "/api/auth/signup",
      [
        verifySignUp.checkDuplicateUsernameOrEmail
      ],
      userController.signup
    );
  
    app.post("/api/auth/signin", userController.signin);

    app.post('/api/login', userController.login);
    app.delete('/api/auth/logout', userController.logout)
  };
  
  