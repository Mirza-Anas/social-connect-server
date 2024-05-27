const { v2: cloudinary } = require("cloudinary");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

const uploadImage = async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.files.image.path);
        // console.log("uploaded image url =>", result);
        res.json({
            url: result.secure_url,
            public_id: result.public_id,
        });
    } catch (err) {
        console.log(err);
    }
};

module.exports = uploadImage;
