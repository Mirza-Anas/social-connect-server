const User = require("../models/user");

const userFollow = async (req, res) => {
    try {
        const targetUser = await User.findByIdAndUpdate(req.body._id, {
            $addToSet: { followers: req.auth._id },
        });

        const user = await User.findByIdAndUpdate(
            req.auth._id,
            {
                $addToSet: { following: req.body._id },
            },
            { new: true },
        ).select("-password -answer -question");

        res.json(user);
    } catch (err) {
        console.log(err);
    }
};

module.exports = userFollow;
