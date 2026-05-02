const pool = require("../config/db");

const submitVerificationRequest = async (req, res) => {
  try {
    const userId = req.user.id;

    const { verification_type, document_type } = req.body;

    const document_url = req.file ? req.file.path : null;

    const result = await pool.query(
      `
      INSERT INTO verification_requests
      (user_id, verification_type, document_type, document_url)
      VALUES ($1,$2,$3,$4)
      RETURNING *
      `,
      [userId, verification_type, document_type, document_url]
    );

    res.status(201).json({
      success: true,
      message: "Verification request submitted",
      request: result.rows[0]
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getUserRequests = async (req, res) => {
  try {
    const userId = req.params.userId;

    const result = await pool.query(
      `
      SELECT *
      FROM verification_requests
      WHERE user_id = $1
      ORDER BY requested_at DESC
      `,
      [userId]
    );

    res.json({ success: true, requests: result.rows });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const reviewRequest = async (req, res) => {
  try {
    const adminId = req.user.id;
    const { requestId } = req.params;
    const { status, rejection_reason } = req.body;

    const request = await pool.query(
      `SELECT * FROM verification_requests WHERE id=$1`,
      [requestId]
    );

    if (!request.rows.length) {
      return res.status(404).json({ message: "Not found" });
    }

    const userId = request.rows[0].user_id;

    // APPROVE
    if (status === "verified") {
      await pool.query(
        `UPDATE users SET is_identity_verified=true WHERE id=$1`,
        [userId]
      );
    }

    // UPDATE REQUEST
    const result = await pool.query(
      `
      UPDATE verification_requests
      SET verification_status=$1,
          rejection_reason=$2,
          verified_by=$3,
          verified_at=NOW(),
          reviewed_at=NOW()
      WHERE id=$4
      RETURNING *
      `,
      [status, rejection_reason, adminId, requestId]
    );

    res.json({
      success: true,
      message: "Updated",
      request: result.rows[0]
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  submitVerificationRequest,
  getUserRequests,
  reviewRequest
};