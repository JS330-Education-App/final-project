const express = require("express");
const mustacheExpress = require('mustache-express');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_CONNECTION_STRING || 'mongodb://localhost/final-project');

const uri = process.env.MONGODB_URI;
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
