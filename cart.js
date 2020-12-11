var mongoose = require('mongoose');
//schema
mongoose.set('useFindAndModify', false);
var itemSchema = mongoose.Schema({
    id: {
        type: Number
    },
    cart: {
        type: Array,
        required: true
    }
    
});

// Export Bio Model
var Item = module.exports = mongoose.model('cart', itemSchema,"cart");
module.exports.get = function (callback, limit) {
   Item.find(callback).limit(limit); 
}