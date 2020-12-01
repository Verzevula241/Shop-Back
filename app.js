
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
mongoose.connect("mongodb://localhost:27017/test", { useNewUrlParser: true, useUnifiedTopology: true });
 
const userScheme = new Schema({title: String}, {_id: false});
const User = mongoose.model("User", userScheme,"items");
 
User.find({title:"Hats"},'title', function(err, docs){
    mongoose.disconnect();
     
    if(err) return console.log(err);
     
    console.log(Object(docs));
});
