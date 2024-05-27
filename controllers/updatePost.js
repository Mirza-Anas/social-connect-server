const Post = require("../models/post");

const { v2: cloudinary } = require("cloudinary");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

const updatePost = async (req, res) => {
    const { content, image } = req.body;
    try {
        const prevPost = await Post.findById(req.params._id);
        const prevImage = prevPost.image?.public_id;
        if (
            image &&
            prevImage &&
            prevPost.image.public_id != image.public_id
        ) {
            const result = await cloudinary.uploader.destroy(
                prevPost.image.public_id
            );
            console.log("deleted image", result);
        }
        const post = await Post.findByIdAndUpdate(req.params._id, req.body,{new:true});
        res.json(post);
    } catch (err) {
        console.log(err);
    }
};

const deletePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params._id);

        if (post.image && post.image.public_id) {
            const image = await cloudinary.uploader.destroy(
                post.image.public_id
            );
        }
        res.json({ ok: true });
    } catch (err) {
        console.log(err);
    }
};

module.exports = { updatePost, deletePost };
