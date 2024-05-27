const Post = require("../models/post");

const handleLike = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(
            req.body._id,
            {
                $addToSet: { likes: req.auth._id },
            },
            { new: true }
        );
        res.json(post);
    } catch (err) {
        console.log(err);
    }
};

const handleUnlike = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(
            req.body._id,
            {
                $pull: { likes: req.auth._id },
            },
            { new: true }
        );
        res.json(post);
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    handleLike,
    handleUnlike,
};
