const User = require("../models/user");

const userFollowing = async (req, res) => {
    try {
        const user = await User.findById(req.auth._id);

        const following = await User.find({ _id: user.following }).limit(10);

        res.json(following);
    } catch (err) {
        console.log(err);
    }
};

module.exports = userFollowing;
