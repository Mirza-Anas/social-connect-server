const Post = require("../models/post");

const addComment = async (req, res) => {
    try {
        const { postId, comment } = req.body;
        const post = await Post.findByIdAndUpdate(
            postId,
            {
                $push: { comments: { text: comment, postedBy: req.auth._id } },
            },
            { new: true }
        )
            .populate("postedBy", "_id image username")
            .populate("comments.postedBy", "_id username image");
        res.json(post);
    } catch (err) {
        console.log(err);
    }
};

const removeComment = async (req, res) => {
    try {
        const { postId, comment } = req.body;
        const post = await Post.findByIdAndUpdate(
            postId,
            {
                $pull: { comments: { _id: comment._id } },
            },
            { new: true }
        );
        res.json(post);
    } catch (err) {
        console.log(err);
    }
};

module.exports = { addComment, removeComment };
