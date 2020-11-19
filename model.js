var mongoose = require('mongoose');
//schema
var itemSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    routeName: {
        type: String,
        required: true
    }
    
});

// Export Bio Model
var Item = module.exports = mongoose.model('item', itemSchema,"items");
module.exports.get = function (callback, limit) {
   Item.find(callback).limit(limit); 
}