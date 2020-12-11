var mongoose = require('mongoose');
//schema
mongoose.set('useFindAndModify', false);
var itemSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    cart: Array,
    history: Array
  })
;

// Export Bio Model
var Item = module.exports = mongoose.model('user', itemSchema,"users");
module.exports.get = function (callback, limit) {
   Item.find(callback).limit(limit); 
}