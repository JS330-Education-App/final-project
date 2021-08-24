const server = require("./server");
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 5000;

mongoose.connect('process.env.MONGO_CONNECTION_STRING', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}).then(() => {
  server.listen(port, () => {
   console.log(server.address().port);
  });
});
