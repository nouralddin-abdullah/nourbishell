const express = require("express");
const userController = require("../controllers/userController");
const authController = require("./../controllers/authController");
const toDoListRouter = require("./toDoListRoutes");
const router = express.Router();

// routes

router.get(
  "/me",
  authController.protect,
  userController.getMe,
  userController.getUser
);

router.post("/:id/follow", authController.protect, userController.followUser);
router.delete(
  "/:id/unfollow",
  authController.protect,
  userController.unfollowUser
);
router.get(
  "/:id/followers",
  authController.protect,
  userController.getFollowers
);
router.get(
  "/:id/following",
  authController.protect,
  userController.getFollowing
);

router.use("/toDoList", toDoListRouter);
router.route("/:username").get(authController.protect, userController.getUser);
router.patch(
  "/updateMyPassword",
  authController.protect,
  authController.updatePassword
);
router.post(
  `/signup`,
  userController.uploadProfilePic,
  userController.resizeProfilePic,
  authController.signup
);
router.post(`/login`, authController.login);
router.route(`/forgotPassword`).post(authController.forgotPassword);
router.route(`/resetPassword/:token`).patch(authController.resetPassword);

router
  .route(`/`)
  .get(
    authController.protect,
    authController.restrictTo("admin"),
    userController.getAllUsers
  );

module.exports = router;
