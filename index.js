const server = require("./server");
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 5000;

mongoose.connect('mongodb+srv://patrick:uBlCC74eKHTv8Ahg@education-app.cidu4.mongodb.net/education-app?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}).then(() => {
  server.listen(port, () => {
   console.log(server.address().port);
  });
});
