const express = require("express");
const app = express();
const helmet = require("helmet");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileRouter = require("./routes/files.js");
const authRouter = require("./routes/auth.js");
const userRouter = require("./routes/user.js")
const PORT = process.env.PORT || 3000;

dotenv.config();
const corsOption = {
    origin: [process.env.FRONT_END_URL || "http://localhost:5173"],
    credentials: true,
};

app.use(cors(corsOption));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(helmet.hidePoweredBy());
app.use("/public", express.static("public"));
app.set("view-engine", "ejs");
require("./db");
app.use("/file/", fileRouter);
app.use("/auth/", authRouter);
app.use(("/user"), userRouter);

app.get("/",(req,res) => {
    res.status(200).send("Welcome to G Share API")
})


app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
});
