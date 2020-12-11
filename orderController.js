Order = require('./order');
//For creating new bio
exports.add = function (req, res) {
    var order = new Order();
    order.username = req.body.id? req.body.id : "Anon"
    order.email = req.body.email
    order.status = 'create'
    order.date = new Date();
    order.cart = JSON.parse(req.body.data);
//Save and check error
    order.save(function (err,answ) {
        if (err)
            return res.json(err);
    return res.json({
            message: `New order Added! id ${answ.id}`,
            data: order
        });
    });
};
exports.find = function(req, res) {
    let user = req.body.username
    Order.find({ username: user },function (err, order) {
        if (err)
            res.send(err);
        res.json({
            data: order
        });
    });
};