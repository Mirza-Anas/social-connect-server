const authRegister = require("./authRegister");
const authLogin = require("./authLogin");
const authUser = require("./authUser");
const authReset = require("./authReset");
const createPost = require("./createPost");
const uploadImage = require("./uploadImage");
const fetchPosts = require("./fetchPosts");
const editPost = require("./editPost");
const { updatePost, deletePost } = require("./updatePost");
const profileUpdate = require("./profileUpdate");
const findPeople = require("./findPeople");
const userFollow = require("./userFollow");
const userFollowing = require("./userFollowing");
const userUnFollow = require("./userUnFollow");
const {handleLike, handleUnlike} = require("./likeToggle");
const {addComment, removeComment} = require("./addComment");
const searchUser = require("./searchUser");

module.exports = {
    authRegister,
    authLogin,
    authUser,
    authReset,
    createPost,
    uploadImage,
    fetchPosts,
    editPost,
    updatePost,
    deletePost,
    profileUpdate,
    findPeople,
    userFollow,
    userFollowing,
    userUnFollow,
    handleLike,
    handleUnlike,
    addComment,
    removeComment,
    searchUser
};
