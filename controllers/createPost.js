const Post = require("../models/post");

const createPost = (req, res) => {
    const { content,image } = req.body;
    if (!content.length) return res.json({ error: "content is required" });

    try {
        const post = new Post({content,image, postedBy:req.auth._id})
        post.save();
        res.json(post);
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
};

module.exports = createPost;
