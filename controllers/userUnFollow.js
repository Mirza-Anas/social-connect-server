const { findByIdAndUpdate } = require("../models/post");
const User = require("../models/user");

const userUnFollow = async (req, res) => {
    try {
        const targetUser = await User.findByIdAndUpdate(req.body._id, {
            $pull: { followers: req.auth._id },
        });

        const user = await User.findByIdAndUpdate(
            req.auth._id,
            {
                $pull: { following: req.body._id },
            },
            { new: true }
        );

        res.json(user);
    } catch (err) {
        console.log(err);
    }
};

module.exports = userUnFollow;