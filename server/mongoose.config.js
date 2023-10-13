const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/note-wall", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Established a connection to the database"))
  .catch(err => console.error("Something went wrong when connecting to the database", err));

