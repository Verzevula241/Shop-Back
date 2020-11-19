let express = require('express')
let app = express();
var port = process.env.PORT || 8080;

app.get('/', (req, res) => res.send('Welcome to Express'));

app.listen(port, function() {
    console.log("Running FirstRest on Port "+ port);
})

let apiRoutes = require("./router")

app.use('/api', apiRoutes)

let bodyParser = require('body-parser');

let mongoose = require('mongoose');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

const dbPath = 'mongodb://localhost/test?retryWrites=true&w=majority';
const options = {useNewUrlParser: true, useUnifiedTopology: true}
const mongo = mongoose.connect(dbPath, options);
mongo.then(() => {
    console.log('connected');
}, error => {
    console.log(error, 'error');
})