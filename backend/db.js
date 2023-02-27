const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_DB_URL || "mongodb://127.0.0.1:27017/FileSharingApp", {
      useNewUrlParser: true
  })
  .then((d) => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = mongoose
