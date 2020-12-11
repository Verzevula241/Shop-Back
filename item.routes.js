const authJwt = require("./middleware/authJwt");
const itemController = require("./itemController");
const cartController = require('./cartController');

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/item", itemController.index);
    app.get('/api/item/:item_id', itemController.view);
    app.get('/api/item/:item_id/:prod_id', itemController.find);
    app.post("/api/item", itemController.index)

    //   app.post('/api/cart',[authJwt.verToken], cartController.find)
    //   app.post('/api/cart/add',[authJwt.verToken], cartController.add)
    //   app.post('/api/cart/update',[authJwt.verToken], cartController.update)
    //   app.post('/api/cart/:user_id',[authJwt.verToken],cartController.find)
    app.post('/api/cart/add', cartController.add)
    app.post('/api/cart/update', cartController.update)
    app.post('/api/cart/delete', cartController.delete)
    app.post('/api/cart/:user_id', cartController.find)
    app.post('/api/cart', cartController.find)


};