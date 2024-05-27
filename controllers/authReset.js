const User = require("../models/user");
const { hashPassword } = require("../helpers/auth");

const authReset = async (req, res) => {
    const { email, newPass, rePass, question, answer } = req.body;

    if (!newPass || newPass.length < 8)
        return res
            .status(400)
            .send("password should be atleast 8 charachters long");

    if (newPass !== rePass)
        return res
            .status(400)
            .send("Passwords Missmatched. Please virify and send again");

    const user = await User.findOne({ email });
    if (!user)
        return res
            .status(400)
            .send("You don't have an accounct. Please register");

    if (user.question !== question || user.answer !== answer)
        return res
            .status(400)
            .send(
                "Either you selected wrong question or your secret doesn't match"
            );

    const hashedPassword = await hashPassword(newPass);

    await User.findOneAndUpdate({ email }, { password: hashedPassword })
        .then(() => {
            return res.json({
                ok: true,
            });
        })
        .catch((err) => {
            return res.status(400).send("error try again..");
        });
};

module.exports = authReset;
