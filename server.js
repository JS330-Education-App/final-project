const express = require("express");
const mustacheExpress = require('mustache-express');
<<<<<<< HEAD

//const mustacheExpress = require('mustache-express');
=======
>>>>>>> 963469deb2edd766dc9455ad136780eaf5e88cda

const routes = require("./routes");

const server = express();
server.engine('mustache', mustacheExpress());
server.set('view engine', 'mustache');

server.use(express.json());

server.use(express.static('static'));
server.use(express.static(__dirname + '/public'));
server.use(routes);

module.exports = server;
