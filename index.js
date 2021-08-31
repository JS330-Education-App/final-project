const server = require("./server");
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 5000;

<<<<<<< HEAD
mongoose.connect('mongodb+srv://patrick:uBlCC74eKHTv8Ahg@education-app.cidu4.mongodb.net/education-app?retryWrites=true&w=majority', {
=======
mongoose.connect('mongodb://localhost/final-project', {
>>>>>>> a0d2fae1bdc50fb38bc6b5a76514bea26ded9073
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}).then(() => {
  server.listen(port, () => {
<<<<<<< HEAD
   console.log(`Server is listening on http://localhost:${port}`);
=======
    console.log(`Server is listening on http://localhost:${port}`);
>>>>>>> a0d2fae1bdc50fb38bc6b5a76514bea26ded9073
  });
});
