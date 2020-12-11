const express = require('express')
const config = require("./auth.config");
const app = express()
const jwt = require('jsonwebtoken')
const User = require("./user");
let mongoose = require('mongoose');
var bodyParser = require('body-parser')
let cors = require('cors')
var bcrypt = require("bcryptjs");
const verifySignUp = require("./middleware/verifySignUp");



app.use(express.json())

app.use(cors({
    exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar'],
  }));
app.use(bodyParser.urlencoded({
    extended: true
  }));
let refreshTokens = []


 
var port = process.env.PORT || 8081;
app.listen(port, function() {
    console.log("Running FirstRest on Port "+ port);
})


app.post(
    "/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail
    ],
    (req, res) => {
        const user = new User({
          username: req.body.username,
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, 8)
        });
      
        user.save((err, user) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          return res.send({ message: "User was registered successfully!" });
        });
      }
  );


app.post('/token', (req, res) => {
    const refreshToken = req.headers.accesstoken
    if (refreshToken == null) return res.sendStatus(401)
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken, config.refresh, (err, user) => {
        if (err) return res.sendStatus(403)
        const accessToken = generateAccessToken({ id: user.id })
        res.json({ accessToken: accessToken })
    })
})

app.delete('/logout', (req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.headers.token)
    res.sendStatus(204).send({
        message: "Logout"
    })
})

app.post('/login', (req, res) => {
    console.log("pup")
    User.findOne({
        email: req.body.email
    })
        .exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            const accessToken = generateAccessToken(user)
            const refreshToken = jwt.sign({ id: user.id }, config.refresh)
            refreshTokens.push(refreshToken)

            // res.set("accessToken",accessToken)
            // res.set("refreshToken",refreshToken)
            // req.headers['accessToken'] = accessToken
            res.status(200).send({
              id: user._id,
              username: user.username,
              email: user.email,
              accessToken: accessToken,
              refreshToken: refreshToken
            });
        })
    })
    function generateAccessToken(user) {
        return jwt.sign({ id: user.id }, config.secret, { expiresIn: '15s' })
    }


    const dbPath = 'mongodb://localhost/test?retryWrites=true&w=majority';
    const options = {useNewUrlParser: true, useUnifiedTopology: true}
    const mongo = mongoose.connect(dbPath, options);
    mongo.then(() => {
        console.log('connected');
    }, error => {
        console.log(error, 'error');
    })