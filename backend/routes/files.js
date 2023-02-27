const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const File = require("../models/File.js");
const User = require("../models/User.js");
const { verifyJwt, optionalVerifyJwt } = require("../middlewares/verifyJwt.js");

// get all users files
router.get("/user/", verifyJwt, async (req, res) => {
    const user = req.user;
    try {
        const userLinks = await File.find({ createdBy: user._id });
        return res.status(200).json(userLinks);
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Sorry Some Error Occurred" });
    }
});

// get file details
router.get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const link = await File.findOne({ link: id });
        if (!link) return res.status(404).json({ message: "Link Not Found" });
        return res.status(200).json(link);
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Sorry Some Error Occurred" });
    }
});

// create a file
router.post("/", optionalVerifyJwt, async (req, res) => {
    let { filename, url, size, type } = req.body;

    let link = "";
    const newFileData = {
        url: url,
        filename: filename,
        size: size,
        type: type,
    };
    try {
        if (req.user) {
            newFileData["createdBy"] = req.user._id;
        }
        link = Math.random().toString(35).split(".")[1];
        let doesLinkExists = await File.findOne({ link: link });

        while (doesLinkExists) {
            link = Math.random().toString(35).split(".")[1];
            doesLinkExists = await File.findOne({ link: link });
        }
        newFileData["link"] = link;
        const newFile = new File(newFileData);
        const savedFile = await newFile.save();
        res.status(200).json(savedFile);
    } catch (error) {
        console.log("error");
        res.status(500).json({ message: "Sorry Some Error Occurred" });
    }
});


// delete a file
router.delete("/:id", verifyJwt, async (req, res) => {
    const id = req.params.id;
    try {
        const file = await File.findById(id);
        const fileUser = await User.findById(file?.createdBy)
        // console.log(file,fileUser)
        if (!file || !fileUser)
            return res.status(404).send({ message: "Could Not Delete" });
        if (file.createdBy == fileUser?.id) {
            await file.deleteOne();
            return res.status(200).send({ message: "Successfully Deleted" });
        } else {
            res.status(401).send({
                message: "Not Authorized to delete this link",
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Sorry Cant Delete The Link" });
    }
});

module.exports = router;
