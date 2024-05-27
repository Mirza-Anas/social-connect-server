const Post = require("../models/post");

const editPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params._id)
        .populate("postedBy", "username _id image")
        .populate("comments.postedBy", "username _id image");
        res.json(post);
    } catch (err) {
        console.log(err);
    }
};

module.exports = editPost;
