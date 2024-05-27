const express = require("express");
const { createPost, 
        uploadImage, 
        fetchPosts, 
        editPost, 
        updatePost, 
        deletePost, 
        handleLike, 
        handleUnlike, 
        addComment, 
        removeComment 
    } = require("../controllers");
const router = express.Router();
const {validateToken, authUpdate} = require("../middleware");
const tokenErrorHandler = require("../middleware/tokenError");
const formidable = require("express-formidable");

router.post("/create-post", validateToken, tokenErrorHandler, createPost);
router.post(
    "/upload-image",
    validateToken,
    tokenErrorHandler,
    formidable({ maxFileSize: 5 * 1024 * 1024 }),
    uploadImage
);

router.get("/user-posts", validateToken, tokenErrorHandler, fetchPosts);
router.get("/user-post/:_id",validateToken, tokenErrorHandler, editPost);
router.put("/update-post/:_id", validateToken, tokenErrorHandler, authUpdate, updatePost);
router.delete("/delete-post/:_id", validateToken, tokenErrorHandler, authUpdate, deletePost);
router.put("/handle-like", validateToken, tokenErrorHandler, handleLike);
router.put("/handle-unlike", validateToken, tokenErrorHandler, handleUnlike);
router.put("/add-comment", validateToken, tokenErrorHandler, addComment);
router.delete("/remove-comment", validateToken, tokenErrorHandler, removeComment);

module.exports = router;
