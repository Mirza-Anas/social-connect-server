const User = require("../models/user");
const authUser = async (req, res) => {
    try {
        if (req.auth) {
            const user = await User.findById(req.auth._id);
            res.json({ ok: true });
        }
    } catch (err) {
        res.sendStatus(400);
    }
};

module.exports = authUser;
