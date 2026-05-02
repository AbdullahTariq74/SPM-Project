const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");

const {
  createReview,
  getReviews,
  updateReview,
  deleteReview
} = require("../controllers/review.controller");

// GET REVIEWS
router.get("/:freelancerId", getReviews);

// CREATE REVIEW
router.post("/:freelancerId", auth, createReview);

// UPDATE REVIEW
router.put("/:reviewId", auth, updateReview);

// DELETE REVIEW
router.delete("/:reviewId", auth, deleteReview);

module.exports = router;