const User = require("../models/user");

const findPeople = async (req, res) => {
    try {
        const user = await User.findById(req.auth._id);
        let following = user.following;
        following.push(user._id);

        const people = await User.find({ _id: { $nin: following } },"-password -answer -question").limit(10);

        res.json(people);
    } catch (err) {
        console.log(err);
    }
};

module.exports = findPeople;
