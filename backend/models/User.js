const mongoose = require("mongoose");

const UserScheme = new mongoose.Schema({
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
    },
    fromGoogle: {
        type: Boolean,
        default: false
    },
    tokens: [{ type: String }],
});

const User = mongoose.model("users", UserScheme);

module.exports = User;
