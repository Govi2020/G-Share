const express = require("express");
const router = express.Router();
const User = require("../models/User") 

router.get(("/:id"),async (req,res) => {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({message: "User Not Found!"})
    // console.log(user)
    const {password,tokens,...others} = user?._doc;
    res.status(200).json(user)
})

module.exports = router;
