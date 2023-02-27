const jwt = require("jsonwebtoken");
const User = require("./models/User.js");


const refreshToken = async (req,res,next,verify = false) => {
    try {
        const cookies = req.cookies;
        if (!cookies?.refresh_token)
            return res.status(401).json({ message: "Not Authorized" });
        const refreshToken = cookies.refresh_token;

        const foundUser = await User.findOne({ tokens: refreshToken });
        if (!foundUser)
            return res.status(404).json({ message: "User Not Found" });
        return jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET_KEY,
            async (err, decoded) => {
                if (err || foundUser.username !== decoded.username) {
                    if (err.name == "TokenExpiredError") {
                        foundUser.updateOne({
                            $pull: {
                                tokens: refreshToken,
                            },
                        });
                        await foundUser.save();
                    }
                    return res.status(403).json({ message: "Not Authorized" });
                }
                const accessToken = jwt.sign(
                    { username: decoded.username },
                    process.env.ACCESS_TOKEN_SECRET_KEY,
                    { expiresIn: "10s" }
                );
                if (verify) {
                    return accessToken;
                }
                res.json({ accessToken,username: foundUser.username });
            }
        );
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Sorry Some Error Occurred" });
    }
};

module.exports = refreshToken;