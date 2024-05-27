const User = require("../models/user");
const { comparePassword } = require("../helpers/auth");
const jwt = require("jsonwebtoken");

const authLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // check if the user is in the database
        const user = await User.findOne({ email });
        if (!user)
            return res
                .status(400)
                .send("user not found. Please register first");

        // check if password is correct
        const match = await comparePassword(password, user.password);
        if (!match) return res.status(400).send("Wrong Password");

        // create token if password is correct
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        user.password = undefined;
        user.answer = undefined;

        res.json({
            token,
            user,
        });
    } catch(err) {
        console.log(err);
        res.status(400).send("error. Please try again..");
    }
};

module.exports = authLogin;
