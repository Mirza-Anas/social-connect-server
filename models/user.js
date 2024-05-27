const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        username: {
            type: String,
            trim: true,
            required: true,
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            min: 6,
            max: 64,
        },
        question: {
            type: String,
            required: true,
        },
        answer: {
            type: String,
            required: true,
            trim: true,
        },
        userId: {
            type: String,
            required: true,
            unique: true,
        },
        about: {},
        image: {
            url: String,
            public_id: String,
        },
        followers: [{ type: Schema.ObjectId, ref: "User" }],
        following: [{ type: Schema.ObjectId, ref: "User" }],
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
