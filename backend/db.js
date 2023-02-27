const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_DB_URL, {
      useNewUrlParser: true
  })
  .then((d) => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = mongoose
