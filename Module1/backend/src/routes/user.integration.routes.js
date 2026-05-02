const express = require("express");
const router = express.Router();

const {
  getUserById,
  getUserProfile,
  getUserSkills,
  getUserTrust,
  getUserVerification,
  searchUsers
} = require("../controllers/user.integration.controller");

// BASIC USER
router.get("/:userId", getUserById);

// PROFILE
router.get("/:userId/profile", getUserProfile);

// SKILLS
router.get("/:userId/skills", getUserSkills);

// TRUST SCORE
router.get("/:userId/trust", getUserTrust);

// VERIFIED
router.get("/:userId/verified", getUserVerification);

// SEARCH
router.get("/search/all", searchUsers);

module.exports = router;