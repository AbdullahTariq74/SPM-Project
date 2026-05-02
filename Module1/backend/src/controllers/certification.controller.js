const pool = require("../config/db");

// GET CERTIFICATIONS (PUBLIC)
const getCertifications = async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await pool.query(
      `
      SELECT *
      FROM certifications
      WHERE user_id = $1
      ORDER BY issue_date DESC
      `,
      [userId]
    );

    res.json({
      success: true,
      certifications: result.rows
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error ❌" });
  }
};

const createCertification = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      certification_name,
      issuing_authority,
      credential_id,
      issue_date,
      expiry_date,
      verification_url
    } = req.body;

    const fileUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const result = await pool.query(
      `
      INSERT INTO certifications (
        user_id,
        certification_name,
        issuing_authority,
        credential_id,
        issue_date,
        expiry_date,
        verification_url,
        certificate_file_url,
        verification_status
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,'pending')
      RETURNING *
      `,
      [
        userId,
        certification_name,
        issuing_authority,
        credential_id,
        issue_date,
        expiry_date,
        verification_url,
        fileUrl
      ]
    );

    res.status(201).json({
      success: true,
      message: "Certification submitted for verification ✅",
      certification: result.rows[0]
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error ❌" });
  }
};

const verifyCertification = async (req, res) => {
  try {
    const adminId = req.user.id;
    const { certId } = req.params;

    const { status, rejection_reason } = req.body;
    // status = "verified" OR "rejected"

    // ❌ validation
    if (!["verified", "rejected"].includes(status)) {
      return res.status(400).json({
        message: "Invalid status ❌"
      });
    }

    const result = await pool.query(
      `
      UPDATE certifications
      SET 
        verification_status = $1,
        verified_by = $2,
        verified_at = NOW(),
        updated_at = NOW(),
        rejection_reason = $3
      WHERE id = $4
      RETURNING *
      `,
      [
        status,
        adminId,
        status === "rejected" ? rejection_reason : null,
        certId
      ]
    );

    res.json({
      success: true,
      message: `Certification ${status} ✅`,
      certification: result.rows[0]
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error ❌" });
  }
};

module.exports = {
  getCertifications,
  createCertification,
  verifyCertification
};