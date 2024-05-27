const express = require("express");
const { authRegister, authLogin, authUser, authReset, profileUpdate,findPeople, userFollow, userFollowing, userUnFollow, searchUser } = require("../controllers");
const router = express.Router();
const {validateToken} = require("../middleware");
const tokenErrorHandler = require("../middleware/tokenError");

router.post("/register", authRegister);
router.post("/login", authLogin);
router.get("/current-user", validateToken,tokenErrorHandler, authUser);
router.post("/forgot-password",authReset);
router.put("/profile-update", validateToken,tokenErrorHandler, profileUpdate);
router.get("/find-people", validateToken, tokenErrorHandler, findPeople);
router.put("/user-follow", validateToken, tokenErrorHandler, userFollow);
router.get("/user-following", validateToken, tokenErrorHandler, userFollowing);
router.put("/user-unfollow", validateToken, tokenErrorHandler, userUnFollow);
router.get("/search-user/:query", validateToken, tokenErrorHandler, searchUser);

module.exports = router;
