const { expressjwt: jwt } = require("express-jwt");
const Post = require("../models/post");

const validateToken = jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
});

const authUpdate = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params._id)
        if(post.postedBy != req.auth._id) {
            return res.status(400).send("this post is not yours");
        }
    } catch (err) {
        console.log(err)
    }
    next();
};

module.exports = { validateToken, authUpdate };
