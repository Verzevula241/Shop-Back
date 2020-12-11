const orderController = require("./orderController");
const authJwt = require("./middleware/authJwt");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/order/add", orderController.add)
    app.post("/api/order/get",[
        authJwt.verToken
      ], orderController.find)

};