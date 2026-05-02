const pool = require("../config/db");

// CREATE REVIEW
const createReview = async (req, res) => {
  try {
    const reviewerId = req.user.id;
    const { freelancerId } = req.params;

    const {
      rating,
      comment,
      communication_rating,
      quality_rating,
      deadline_rating
    } = req.body;

    // ----------------------------
    // 1. GET USER ROLE (FIX ADDED)
    // ----------------------------
    const userResult = await pool.query(
      "SELECT role FROM users WHERE id = $1",
      [reviewerId]
    );

    const role = userResult.rows[0]?.role;

    // ----------------------------
    // 2. ONLY CLIENTS CAN REVIEW
    // ----------------------------
    if (role !== "client") {
      return res.status(403).json({
        message: "Only clients can submit reviews ❌"
      });
    }

    // ----------------------------
    // 3. PREVENT SELF REVIEW
    // ----------------------------
    if (Number(reviewerId) === Number(freelancerId)) {
      return res.status(400).json({
        message: "You cannot review yourself ❌"
      });
    }

    // ----------------------------
    // 4. INSERT REVIEW
    // ----------------------------
    const result = await pool.query(
      `
      INSERT INTO reviews (
        freelancer_id,
        reviewer_id,
        rating,
        comment,
        communication_rating,
        quality_rating,
        deadline_rating
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7)
      RETURNING *
      `,
      [
        freelancerId,
        reviewerId,
        rating,
        comment,
        communication_rating,
        quality_rating,
        deadline_rating
      ]
    );

    res.status(201).json({
      success: true,
      message: "Review added ✅",
      review: result.rows[0]
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error ❌" });
  }
};

// GET REVIEWS
const getReviews = async (req, res) => {
  try {
    const { freelancerId } = req.params;

    const result = await pool.query(
      `
      SELECT *
      FROM reviews
      WHERE freelancer_id = $1
        AND is_public = true
      ORDER BY created_at DESC
      `,
      [freelancerId]
    );

    res.json({
      success: true,
      reviews: result.rows
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error ❌" });
  }
};

// UPDATE REVIEW
const updateReview = async (req, res) => {
  try {
    const userId = req.user.id;
    const { reviewId } = req.params;

    const {
      rating,
      comment,
      communication_rating,
      quality_rating,
      deadline_rating
    } = req.body;

    const result = await pool.query(
      `
      UPDATE reviews
      SET
        rating = $1,
        comment = $2,
        communication_rating = $3,
        quality_rating = $4,
        deadline_rating = $5,
        is_edited = true,
        edited_at = NOW()
      WHERE id = $6 AND reviewer_id = $7
      RETURNING *
      `,
      [
        rating,
        comment,
        communication_rating,
        quality_rating,
        deadline_rating,
        reviewId,
        userId
      ]
    );

    res.json({
      success: true,
      message: "Review updated ✅",
      review: result.rows[0]
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error ❌" });
  }
};

// DELETE REVIEW
const deleteReview = async (req, res) => {
  try {
    const userId = req.user.id;
    const { reviewId } = req.params;

    await pool.query(
      `
      DELETE FROM reviews
      WHERE id = $1 AND reviewer_id = $2
      `,
      [reviewId, userId]
    );

    res.json({
      success: true,
      message: "Review deleted ✅"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error ❌" });
  }
};

module.exports = {
  createReview,
  getReviews,
  updateReview,
  deleteReview
};