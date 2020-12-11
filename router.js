let cors = require('cors')

let router = require('express').Router();

router.options('*', cors())

router.get('/', function(req, res) {
    res.json({
        status: 'API',
        message: 'Rest'
    });
});


var itemController = require('./itemController');
var cartController = require('./cartController');

router.route('/cart').post(cartController.find)
router.route('/cart/add').post(cartController.add)
router.route('/cart/update').post(cartController.update)
router.route('/cart/:user_id').get(cartController.find)

router.route('/item').get(itemController.index).post(itemController.add)
router.route('/item/:item_id').get(itemController.view)
router.route('/item/:item_id/:prod_id').get(itemController.find)

module.exports = router;