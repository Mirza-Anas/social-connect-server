const Post = require("../models/post");
const User = require("../models/user");

const fetchPosts = async (req, res) => {
    try {
        const user = await User.findById(req.auth._id);
        let following = user.following;
        following.push(req.auth._id);

        const posts = await Post.find({ postedBy: { $in: following } })
            .populate("postedBy", "username _id image")
            .populate("comments.postedBy", "username _id image")
            .sort({ createdAt: -1 })
            .limit(10);
        res.json(posts);
    } catch (err) {
        console.log(err);
    }
};

module.exports = fetchPosts;
