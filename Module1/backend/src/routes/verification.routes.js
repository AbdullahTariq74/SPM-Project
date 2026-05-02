const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");

const {
  submitVerificationRequest,
  getUserRequests,
  reviewRequest
} = require("../controllers/verification.controller");

// USER
router.post(
  "/request",
  auth,
  upload.single("document"),
  submitVerificationRequest
);

router.get("/:userId", auth, getUserRequests);

// ADMIN
router.patch("/review/:requestId", auth, reviewRequest);

module.exports = router;