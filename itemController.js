Bio = require('./model');

//For index
exports.index = function (req, res) {
    Bio.get(function (err, bio) {
        if (err)
            res.json({
                status: "error",
                message: err
            });
        res.json({
            status: "success",
            data: bio       
        });
    });
};

exports.view = function (req, res) {
    console.log(req.params.item_id)
    Bio.find({routeName:req.params.item_id}, function (err, bio) {
        if (err)
            res.send(err);
        res.json({
            data: bio
        });
    });
};
exports.find = function(req, res) {
    let num = Number(req.params.prod_id)
    Bio.findOne({routeName:req.params.item_id},{items: {$elemMatch: {id: num}}},function (err, bio) {
        if (err)
            res.send(err);
        res.json({
            data: bio
        });
    });
};
