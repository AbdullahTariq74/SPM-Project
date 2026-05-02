const express = require("express");
const router = express.Router();

const {
  updateProfile
} = require("../controllers/profile.controller");

const auth = require("../middleware/auth.middleware");


const {
  getMyProfile,
  getPublicProfile
} = require("../controllers/profile.controller");

// MY PROFILE
router.get("/me", auth, getMyProfile);

// PUBLIC PROFILE (NO AUTH REQUIRED)
router.get("/public/:userId", getPublicProfile);

const upload = require("../utils/upload");
const { uploadAvatar, uploadBanner } = require("../controllers/profile.controller");

router.post(
  "/:userId/upload-avatar",
  auth,
  upload.single("avatar"),
  uploadAvatar
);

router.post(
  "/:userId/upload-banner",
  auth,
  upload.single("banner"),
  uploadBanner
);
module.exports = router;