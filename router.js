let router = require('express').Router();


router.get('/', function(req, res) {
    res.json({
        status: 'API',
        message: 'Rest'
    });
});


var itemController = require('./itemController');


router.route('/item').get(itemController.index)

router.route('/item/:item_id').get(itemController.view)

router.route('/item/:item_id/:prod_id').get(itemController.find)

module.exports = router;