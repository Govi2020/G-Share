const jwt = require("jsonwebtoken");
const mongoose = require('mongoose')
const User = require("../models/User");

const verifyJwt = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token)
        return res.status(401).json({ message: "You are not Authenticated" });

    jwt.verify(token, process.env.JWT_TOKEN_SECRET_KEY, async (err, user) => {
        if (err)
            return res.status(403).json({
                message:
                    "Sorry Some Problem with authentication.Please try again",
            });
        const foundUser = await User.findOne({
            _id: mongoose.Types.ObjectId(user),
            tokens: token,
        });
        if (!foundUser) return res.status(404).json({message: "User Not Found😥"})
        req.userId = user;
        req.user = foundUser;
        next();
    });
};

const optionalVerifyJwt = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) return next();

    jwt.verify(token, process.env.JWT_TOKEN_SECRET_KEY, async (err, user) => {
        if (err) next();
        const foundUser = await User.findOne({
            _id: mongoose.Types.ObjectId(user),
            tokens: token,
        });
        if (foundUser) {
            req.user = foundUser;
        }
        return next();
    });
};

module.exports = { verifyJwt, optionalVerifyJwt };
