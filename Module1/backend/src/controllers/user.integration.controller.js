const pool = require("../config/db");


// =========================
// 1. BASIC USER INFO
// =========================
const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await pool.query(
      `SELECT id, first_name, last_name, email, role, country, is_identity_verified
       FROM users
       WHERE id = $1`,
      [userId]
    );

    if (!result.rows.length) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      success: true,
      user: result.rows[0]
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


// =========================
// 2. PROFILE INFO (FOR AI MATCHING)
// =========================
const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await pool.query(
      `SELECT *
       FROM profiles
       WHERE user_id = $1`,
      [userId]
    );

    res.json({
      success: true,
      profile: result.rows[0]
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


// =========================
// 3. SKILLS (MARKETPLACE)
// =========================
const getUserSkills = async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await pool.query(
      `SELECT s.*
       FROM skills s
       JOIN user_skills us ON s.id = us.skill_id
       WHERE us.user_id = $1`,
      [userId]
    );

    res.json({
      success: true,
      skills: result.rows
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


// =========================
// 4. TRUST SCORE (PAYMENT)
// =========================
const getUserTrust = async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await pool.query(
      `SELECT trust_score, tier_level, average_rating, total_reviews
       FROM profiles
       WHERE user_id = $1`,
      [userId]
    );

    res.json({
      success: true,
      trust: result.rows[0]
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


// =========================
// 5. VERIFICATION STATUS
// =========================
const getUserVerification = async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await pool.query(
      `SELECT is_identity_verified
       FROM users
       WHERE id = $1`,
      [userId]
    );

    res.json({
      success: true,
      verified: result.rows[0]
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


// =========================
// 6. SEARCH USERS
// =========================
const searchUsers = async (req, res) => {
  try {
    const { role } = req.query;

    const result = await pool.query(
      `SELECT id, first_name, last_name, role
       FROM users
       WHERE role = $1`,
      [role]
    );

    res.json({
      success: true,
      users: result.rows
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getUserById,
  getUserProfile,
  getUserSkills,
  getUserTrust,
  getUserVerification,
  searchUsers
};