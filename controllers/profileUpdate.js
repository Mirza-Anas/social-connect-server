const User = require("../models/user");

const profileUpdate = async (req, res) => {
    console.log(req.body)
    const data = {};
    if (req.body.username) data.username = req.body.username;
    if (req.body.userId) data.userId = req.body.userId;
    if (req.body.about) data.about = req.body.about;
    if (req.body.image) data.image = req.body.image;
    if (req.body.answer) {
        data.answer = req.body.answer;
        data.question = req.body.question;
    }
    try {
        if (data.userId) {
            const exist = await User.findOne({ userId: data.userId });
            if (exist && exist._id != req.auth._id) {
                res.status(409).send(
                    "username Already exist choose something else"
                );
            }
        }
        const user = await User.findByIdAndUpdate(req.auth._id, data, {
            new: true,
        });
        user.answer = undefined;
        res.json(user);
    } catch (err) {
        console.log(err);
    }
};

module.exports = profileUpdate;
