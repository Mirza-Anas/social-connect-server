const User = require("../models/user");

const searchUser = async (req, res) => {
    const { query } = req.params;
    if (!query) return;

    try {
        const user = await User.find({
            $or: [
                { username: { $regex: query, $options: "i" } },
                { userId: { $regex: query, $options: "i" } },
            ],
        }).select("_id username userId image");
        res.json(user);
    } catch (err) {
        console.log(err);
    }
};

module.exports = searchUser;
