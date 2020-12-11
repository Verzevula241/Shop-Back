var mongoose = require('mongoose');
//schema
mongoose.set('useFindAndModify', false);
var itemSchema = new mongoose.Schema({
    username: String,
    email: String,
    cart: Object,
    date: Date,
    status: String
  })
;

// Export Bio Model
var Item = module.exports = mongoose.model('order', itemSchema,"orders");
module.exports.get = function (callback, limit) {
   Item.find(callback).limit(limit); 
}