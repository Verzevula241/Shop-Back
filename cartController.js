Cart = require('./cart');
//For index
exports.index = function (req, res) {
    Cart.get(function (err, cart) {
        if (err)
            res.json({
                status: "error",
                message: err
            });
        res.json({
            status: "success",
            message: "Got cart Successfully!",
            data: cart
        });
    });
};
//For creating new bio
exports.add = function (req, res) {
    var cart = new Cart();
    cart.id = req.body.id
    cart.cart = JSON.parse(req.body.data);
//Save and check error
    cart.save(function (err,answ) {
        if (err)
            return res.json(err);
    return res.json({
            message: `New cart Added! id ${answ.id}`,
            data: cart
        });
    });
};
exports.update = function (req, res) {
    var cart = new Cart();
    cart.id = req.body.id
    cart.cart = JSON.parse(req.body.data);
    id = req.body.id
    cart = JSON.parse(req.body.data);
//Save and check error
    Cart.findOneAndUpdate({'_id': id},{"cart": cart},{upsert: true,new: true},function (err,answ) {
        if (err)
            return res.json(err);
        
    return res.json({
            message: `New cart Added! id ${answ.id}`,
            data: cart
        });
    });
};
// View Bio
exports.view = function (req, res) {
    Cart.findById(req.params.bio_id, function (err, bio) {
        if (err)
            res.send(err);
        res.json({
            message: 'cart Details',
            data: bio
        });
    });
};
exports.delete = function (req, res) {
    id = req.body.id
    Cart.findByIdAndRemove(id, function (err, cart) {
        if (err)
            res.send(err);
        res.json({
            message: 'cart delete',
        });
    });
};
exports.find = function(req, res) {
    let num = req.body.id
    Cart.findOne({_id:num},function (err, cart) {
        if (err){
        err.problem = "User not found";
        res.status(404).json({ err });
        return;
    }
        return res.json({
            data: cart
        });
    });
};