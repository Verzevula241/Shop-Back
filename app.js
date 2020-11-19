// const MongoClient = require("mongodb").MongoClient;
// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
  

// const userScheme = new Schema({
//     id: Number,
//     Name: String,
//     imageUrl: String,
//     price: Number
// });
   
// const User = mongoose.model("Item",userScheme)
// const findScheme = new Schema({title: String}, {_id: false});
// const Item = mongoose.model("Item",findScheme)
// mongoose.connect("mongodb://localhost:27017/test", { useNewUrlParser: true });
 

// Item.find({title:"Hats"}, function(err, docs){
//     mongoose.disconnect();
     
//     if(err) return console.log(err);
     
//     console.log(docs);
// });

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
// mongoClient.connect(function(err, client){
      
//     const db = client.db("test");
//     const collection = db.collection("items");
 
//     if(err) return console.log(err);
      
//     collection.find({title:"Jackets"}).project({items: 1,_id: 0}).toArray(function(err, results){
                 
//         results.forEach(element => {
//             console.log(element)
//         })
//         client.close();
//     });
// });