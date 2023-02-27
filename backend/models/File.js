const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
    filename: {
        type: String,
        required: true,
    },
    size: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        required: false,
    },
},{
    timestamps: true
});

const File = mongoose.model("files", FileSchema);

module.exports = File;
