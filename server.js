const express = require("express");
const cors = require('cors');
const mustacheExpress = require('mustache-express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const usersRouter = require('./routes/users');

app.use('/users', usersRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
})

const uri = "mongodb+srv://patrick:uBlCC74eKHTv8Ahg@education-app.cidu4.mongodb.net/education-app?retryWrites=true&w=majority";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("MongoDB connected");
})
.catch(err => console.log(err));
//const mustacheExpress = require('mustache-express');

const routes = require("./routes");

const server = express();
server.engine('mustache', mustacheExpress());
server.set('view engine', 'mustache');
//server.engine('mustache', mustacheExpress());
//server.set('view engine', 'mustache');

server.use(express.json());

server.use(express.static('static'));
server.use(express.static(__dirname + '/public'));
server.use(routes);

module.exports = server;
